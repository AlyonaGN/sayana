import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES_MAP from '../utils/ROUTES_MAP';

function Greeting() {

    return (
        <div>
            Greeting
            <Link to={ROUTES_MAP.QUESTIONNAIRE}>TO QUESTIONS</Link>
        </div>
    );
}

export default Greeting;
