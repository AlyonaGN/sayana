import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ROUTES_MAP from '../utils/ROUTES_MAP';
import store from '../store';

function App() {
  return (
    <Provider store={store}>
      <div className="page">
        <Switch>
          <Route exact path={ROUTES_MAP.QUESTIONNAIRE}>
            questionnaire
          </Route>
          <Route exact path={ROUTES_MAP.MAIN}>
            greeting
          </Route>
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
