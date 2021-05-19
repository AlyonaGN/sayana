import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ROUTES_MAP from '../utils/ROUTES_MAP';

const Questionnaire = () => {
    const userState = useSelector((st) => {
        return st.user;
    });
    React.useEffect(() => {
        
    }, [userState]);

    return (
        <div className="page__content questionnaire">
            Questionnaire
            <Link to={ROUTES_MAP.MAIN}>TO MAIN</Link>
        </div>
    );
}

export default Questionnaire;
