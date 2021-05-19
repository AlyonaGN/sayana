import BUTTONS from './BUTTONS';

const manageButtons = (suggestions, clickHandler) => {
    return suggestions.map((item, index) => {
        if (index >= BUTTONS.maxAmountToShow) return;
        return <button className="questionnaire__sugg-button" onClick={clickHandler}>{item.text}</button>
    })
};


export default manageButtons;
