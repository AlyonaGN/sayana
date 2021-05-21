import { BASE_URL, ENDPOINTS } from "../utils/API_CONSTS";
import TITLES from "../utils/TITLES";

class Api {
    constructor({ baseUrl }) {
        this.baseUrl = baseUrl;
    }

    getToken() {
        return fetch(`${BASE_URL}${ENDPOINTS.TOKEN}`)
            .then(async (res) => {
                const tokenObj =  await this._getResponseData(res);
                return tokenObj.token;
            })
            .catch((err) => {
                this._handleErr(err);
            });
    }

    startSession(token) {
        return fetch(`${BASE_URL}${ENDPOINTS.START}/?token=${token}`)
            .then(async (res) => {
                const response =  await this._getResponseData(res);
                const { suggestions } = response.dialogueResponse;
                const message =  response.dialogueResponse.messages[0];
                const name = response.dialogueResponse.updatedContext.preferences.username;
                return { message, suggestions, name };
            })
            .catch((err) => {
                this._handleErr(err);
            });
    }

    proceedSession(token, input) {
        return fetch(`${BASE_URL}${ENDPOINTS.PROCEED_SESSION}/?token=${token}&input=${input}`)
            .then(async (res) => {
                const response =  await this._getResponseData(res);
                const { suggestions } = response;
                let message =  response.messages[0];
                //для реализации пропуска stories с техникой
                let storyTime; 
                let isCompleted;
                let isKnowledgeIncluded = response.messages.filter(item => item.startsWith('$knowledge'));
                let isSessionCompleted = response.messages.filter(item => item.includes('<SAYANA_SESSION_FINISHED>'));
                if (isKnowledgeIncluded.length > 0) {
                    storyTime = true;
                    message = TITLES.storyTime;
                }
                else {
                    storyTime = false;
                }
                if (isSessionCompleted.length > 0) {
                    isCompleted = true;
                }
                else {
                    isCompleted = false;
                }
                return { message, suggestions, storyTime, isCompleted };
            })
            .catch((err) => {
                this._handleErr(err);
            });
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    _handleErr(err) {
        return Promise.reject(new Error(`Ошибка: ${err.message ? err.message : err}`));
    }
}




export const api = new Api({
    baseUrl: BASE_URL,
});
