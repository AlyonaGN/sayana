import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BUTTON_NAMES from '../utils/BUTTONS';
import ROUTES_MAP from '../utils/ROUTES_MAP';
import { api } from '../api/api';
import { userActions } from '../store/user/actions';
import { sessionActions } from '../store/session/actions';

const Greeting = () => {
    const dispatch = useDispatch();
    const handleStartSessionClick = async () => {
        const token = await api.getToken();
        dispatch(userActions.setUserToken(token));
        const { message, suggestions, name } = await api.startSession(token);
        dispatch(userActions.setUserName(name));
        dispatch(sessionActions.setMessage(message));
        dispatch(sessionActions.setSuggestions(suggestions));
    };

    return (
        <div className="page__content greeting">
            <div className="greeting__image"></div>
            <button className="greeting__start-button" type="button" onClick={handleStartSessionClick}>
                <Link to={ROUTES_MAP.QUESTIONNAIRE} className="greeting__link">{BUTTON_NAMES.startCheckIn}</Link>
            </button>
        </div>
    );
}

export default Greeting;
