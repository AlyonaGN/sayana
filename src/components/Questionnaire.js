import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ROUTES_MAP from '../utils/ROUTES_MAP';
import TITLES from '../utils/TITLES.js';
import { api } from '../api/api';
import { sessionActions } from '../store/session/actions';

const Questionnaire = () => {
    const dispatch = useDispatch();
    const userState = useSelector((st) => {
        return st.user;
    });
    const sessionState = useSelector((st) => {
        return st.session;
    });

    const handleOptionClick = async (e) => {
        console.log();
        const { message, suggestions } = await api.proceedSession(userState.token, e.target.innerHTML);
        dispatch(sessionActions.setMessage(message));
        dispatch(sessionActions.setSuggestions(suggestions));
        console.log(message, suggestions);
    };

    return (
        <div className="page__content questionnaire">
            <div className="questionnaire__header">
                <h1 className="questionnaire__header-title">{TITLES.session}</h1>
                <Link className="questionnaire__close-button" to={ROUTES_MAP.MAIN}/>
            </div>
            <h2 className="questionnaire__message">{sessionState.message}</h2>
            <div className="questionnaire__suggs-container">
                {sessionState.suggestions.map((item, index) => {
                    if (index >= 6) return;
                    return <button className="questionnaire__sugg-button" onClick={handleOptionClick}>{item.text}</button>
                })}
            </div>
        </div>
    );
}

export default Questionnaire;
