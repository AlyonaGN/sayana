import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Provider } from 'react-redux';
import ROUTES_MAP from '../utils/ROUTES_MAP';
import store from '../store';
import Greeting from './Greeting';
import Questionnaire from './Questionnaire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevDepth: this.getPathDepth(this.props.location)
    };
  }

  componentWillReceiveProps() {
    this.setState({ prevDepth: this.getPathDepth(this.props.location) });
  }

  getPathDepth(location) {
    let pathArr = location.pathname.split('/');
    pathArr = pathArr.filter(n => n !== '');
    return pathArr.length;
  }

  render() {
    const { location } = this.props;
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 800, exit: 600 };

    return (
      <Provider store={store}>
      <TransitionGroup component="div" className="page">
        <CSSTransition
          key={currentKey}
          timeout={timeout}
          classNames="pageSlider"
          mountOnEnter={false}
          unmountOnExit={true}
        >
          <div
            className={
              this.getPathDepth(location) - this.state.prevDepth >= 0
                ? 'left'
                : 'right'
            }
          >
            <Switch location={location}>
              <Route path={ROUTES_MAP.MAIN} exact component={Greeting} />
              <Route path={ROUTES_MAP.QUESTIONNAIRE} exact component={Questionnaire} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
      </Provider>
    );
  }
}

export default withRouter(App);
