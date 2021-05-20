import React, { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BUTTONS from '../utils/BUTTONS';
import { api } from '../api/api';
import { sessionActions } from '../store/session/actions';


const SessionManager = () => {

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const userState = useSelector((st) => {
        return st.user;
    });
    const sessionState = useSelector((st) => {
        return st.session;
    });

    const displaySuggestionsAndMoreOption = useCallback(() => {
        const allSuggestions = sessionState.suggestions;
        const optionsToDisplay = allSuggestions.splice(0, BUTTONS.maxAmountWithMoreOption);
        if (allSuggestions.length > 0) {
            optionsToDisplay.push({ text: BUTTONS.more });
        }
        dispatch(sessionActions.setDisplayedSuggestions(optionsToDisplay));
        dispatch(sessionActions.setSuggestions(allSuggestions));
        return allSuggestions;
    }, [sessionState.suggestions, dispatch]);


    const showInput = useCallback(() => {
        dispatch(sessionActions.setInputShown(true));
    }, [dispatch]);

    const manageSession = useCallback(async () => {
        const options = sessionState.suggestions;
            if (sessionState.isCompleted) {
                dispatch(sessionActions.setMessage(BUTTONS.bye));
                return;
            }
            if (!options) {
                showInput();
                return;
            }
            else if (options && options.length > BUTTONS.maxAmountToShow) {
                dispatch(sessionActions.setInputShown(false));
                displaySuggestionsAndMoreOption();
                return;
            }
            dispatch(sessionActions.setInputShown(false));
            dispatch(sessionActions.setDisplayedSuggestions(options));
    }, [displaySuggestionsAndMoreOption, sessionState.suggestions, dispatch, showInput, sessionState.isCompleted]);

    const updateSession = useCallback(async (token, input) => {
        const { message, suggestions, storyTime, isCompleted } = await api.proceedSession(token, input);
        dispatch(sessionActions.setMessage(message));
        dispatch(sessionActions.setSuggestions(suggestions));
        dispatch(sessionActions.setStoryTime(storyTime));
        dispatch(sessionActions.setCompleted(isCompleted));
    }, [dispatch]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        updateSession(userState.token, inputRef.current.value);
    }, [userState.token, updateSession]);

    const handleOptionClick = useCallback(async (e) => {
        updateSession(userState.token, e.target.innerHTML);
    }, [updateSession, userState.token]);

    const defineHandler = useCallback((text) => {
        switch(text) {
               case BUTTONS.more:
                return manageSession;
            default: 
                return handleOptionClick;
        }
    }, [handleOptionClick, manageSession]);

    React.useEffect(() => {
        if (!sessionState.isStoryTime) {
            manageSession();
        }
        else {
            updateSession(userState.token, BUTTONS.watchedStory);
            dispatch(sessionActions.setStoryTime(false));
        }
    }, [sessionState.suggestions, manageSession, updateSession, userState.token, sessionState.isStoryTime, dispatch]);
    
    return (
            sessionState.isInputShown ? 
                <form onSubmit={handleSubmit} noValidate>
                    <input ref={inputRef} type="text" className="questionnaire__input"></input>
                    <button className="questionnaire__submit-button">{BUTTONS.submit}</button>
                </form>
                :
                sessionState.displayedSuggestions.map((item, index) => {
                    return <button 
                            key={index} 
                            className={item.text === BUTTONS.more || item.text === BUTTONS.other 
                                ? "questionnaire__sugg-button questionnaire__sugg-button_highlighted"
                                : "questionnaire__sugg-button"
                            }
                            onClick={defineHandler(item.text)}>
                        {item.text}
                    </button>
                }
            )
    );
};

export default SessionManager;
