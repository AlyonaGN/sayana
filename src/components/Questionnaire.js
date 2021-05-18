import React from 'react';
import ROUTES_MAP from '../utils/ROUTES_MAP';
import { Link } from 'react-router-dom';

function Questionnaire() {

    return (
        <div>
            Questionnaire
            <Link to={ROUTES_MAP.MAIN}>TO MAIN</Link>
        </div>
    );
}

export default Questionnaire;
