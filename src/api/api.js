import { BASE_URL, ENDPOINTS } from "../utils/API_CONSTS";

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
                let suggestions;
                if (Object.keys(response).includes('suggestions')) {
                    suggestions = response.suggestions;
                }
                else {
                    suggestions = [];
                }
                const message =  response.messages[0];
                return { message, suggestions };
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
