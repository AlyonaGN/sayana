import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ROUTES_MAP from '../utils/ROUTES_MAP';
import TITLES from '../utils/TITLES.js';
import BUTTONS from '../utils/BUTTONS';
import SessionManager from './SessionManager';

const Questionnaire = () => {
    const sessionState = useSelector((st) => {
        return st.session;
    });
    return (
        <div className="page__content questionnaire">
            <div className="questionnaire__header">
                <h1 className="questionnaire__header-title">{TITLES.session}</h1>
                <Link className="questionnaire__close-button" to={ROUTES_MAP.MAIN}/>
            </div>
            <h2 className="questionnaire__message">{sessionState.message}</h2>
            <div className={
                sessionState.suggestions.length <= BUTTONS.maxForRowDirection 
                    ? "questionnaire__suggs-container questionnaire__suggs-container_columned"
                    : "questionnaire__suggs-container"
            }>
                <SessionManager/>
            </div>
        </div>
    );
}

export default Questionnaire;
