import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BUTTONS from '../utils/BUTTONS';
import { api } from '../api/api';
import { sessionActions } from '../store/session/actions';


const SessionManager = () => {
    const dispatch = useDispatch();
    const userState = useSelector((st) => {
        return st.user;
    });
    const sessionState = useSelector((st) => {
        return st.session;
    });
    const [suggestionsToDisplay, setSuggestionsToDisplay] = React.useState([]);
    const [suggestions, setSuggestions] = React.useState([]);

    const displaySuggestionsAndMoreOption = useCallback(() => {
        const allSuggestions = suggestions;
        const optionsToDisplay = allSuggestions.splice(0, BUTTONS.maxAmountWithMoreOption);
        if (allSuggestions.length > 0) {
            optionsToDisplay.push({ text: BUTTONS.more });
        }
        else {
            optionsToDisplay.push({text: BUTTONS.other});
        }
        setSuggestionsToDisplay(optionsToDisplay);
        setSuggestions(allSuggestions); 
    }, [suggestions]);

    const manageSession = useCallback(() => {
        const amountOfSuggestions = suggestions.length;
/*         if (amountOfSuggestions === 0) {
            showInput();
            return;
        } */
            if (amountOfSuggestions > BUTTONS.maxAmountToShow) {
                displaySuggestionsAndMoreOption();
                return;
            }
            setSuggestionsToDisplay(suggestions);
    }, [displaySuggestionsAndMoreOption, suggestions]);

    const handleOptionClick = useCallback(async (e) => {
        const { message, suggestions } = await api.proceedSession(userState.token, e.target.innerHTML);
        dispatch(sessionActions.setMessage(message));
        dispatch(sessionActions.setSuggestions(suggestions));
        setSuggestions(suggestions);
    }, [dispatch, userState.token]);

    const defineHandler = useCallback((text) => {
        switch(text) {
/*             case BUTTONS.other:
                return showInput();
                */
            /* case BUTTONS.more:
                return showMoreOptions(); */
            default: 
                return handleOptionClick;
        }
    }, [handleOptionClick]);

    React.useEffect(() => {
        manageSession();
    }, [manageSession]);

    React.useEffect(() => {
        setSuggestions(sessionState.suggestions);
    }, [sessionState.suggestions]);

    React.useEffect(() => {
        console.log(suggestions);
        manageSession();
    }, [suggestions, manageSession]);
    
    return (
            suggestionsToDisplay.map((item, index) => {
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
