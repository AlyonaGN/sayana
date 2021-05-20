import React, { useCallback } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import ROUTES_MAP from '../utils/ROUTES_MAP';
import store from '../store';
import Greeting from './Greeting';
import Questionnaire from './Questionnaire';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { timeout, DIRECTION_CLASSES } from '../utils/ANIMATION_PARAMS';

const App = () => {
  const location = useLocation();
  const getDepth = useCallback((location) => {
    let pathArr = location.pathname.split('/');
    pathArr = pathArr.filter(n => n !== '');
    return pathArr.length;
  }, []);
  const [prevDepth, setPrevDepth] = React.useState(null);
  const defineSlideDirection = useCallback(() => {
    const curDepth = getDepth(location);
    const direction = curDepth - prevDepth > 0
      ? DIRECTION_CLASSES.left
      : DIRECTION_CLASSES.right;
    return direction;
  }, [getDepth, location, prevDepth]);

  React.useEffect(() => {
    setPrevDepth(getDepth(location));
  }, []);

  return (
    <Provider store={store}>
      <TransitionGroup>
        <CSSTransition
          timeout={timeout}
          key={location.key}
          classNames="pageSlider"
          mountOnEnter={false}
          unmountOnExit={true}
        >
          <div className={`page ${defineSlideDirection()}`}>
            <Switch location={location}>
              <Route exact path={ROUTES_MAP.QUESTIONNAIRE}><Questionnaire /></Route>
              <Route exact path={ROUTES_MAP.MAIN}><Greeting /></Route>
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Provider>
  );
}

export default App;