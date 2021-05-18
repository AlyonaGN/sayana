import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import ROUTES_MAP from '../utils/ROUTES_MAP';
import store from '../store';
import Greeting from './Greeting';
import Questionnaire from './Questionnaire';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const App = () => {
  const location = useLocation();
  const timeout = {
    enter: 800,
    exit: 600,
  };

  return (
    <Provider store={store}>
      <TransitionGroup component="div" className="page">
        <CSSTransition>
        <Switch location={location}>
          <Route exact path={ROUTES_MAP.MAIN} component={Greeting}></Route>
          <Route exact path={ROUTES_MAP.QUESTIONNAIRE} component={Questionnaire}></Route>
        </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Provider>
  );
}

export default App;
