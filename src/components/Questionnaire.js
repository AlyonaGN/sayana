import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ROUTES_MAP from '../utils/ROUTES_MAP';
import TITLES from '../utils/TITLES.js';
import BUTTONS from '../utils/BUTTONS';
import SessionManager from './SessionManager';
import { sessionActions } from '../store/session/actions';


const Questionnaire = () => {
    const dispatch = useDispatch();
    const sessionState = useSelector((st) => {
        return st.session;
    });

    const nullifyState = () => {
        dispatch(sessionActions.setDisplayedSuggestions([]));
        dispatch(sessionActions.setSuggestions([]));
        dispatch(sessionActions.setMessage(''));
        sessionActions.setInputShown(false);
        dispatch(sessionActions.setStoryTime(false));
        dispatch(sessionActions.setCompleted(false));
    }

    React.useEffect(() => {
        return nullifyState;
     }, []);
    
    return (
        <div className="page__content questionnaire">
            <div className="questionnaire__header">
                <h1 className="questionnaire__header-title">{TITLES.session}</h1>
                <Link className="questionnaire__close-button" to={ROUTES_MAP.MAIN}/>
            </div>
            <h2 className="questionnaire__message">{sessionState.message}</h2>
            
            <div className={
                sessionState.displayedSuggestions.length <= BUTTONS.maxForColumnDirection 
                    ? "questionnaire__suggs-container questionnaire__suggs-container_columned"
                    : "questionnaire__suggs-container"
                }>
                <SessionManager/>
            </div>
            
        </div>
    );
}

export default Questionnaire;
