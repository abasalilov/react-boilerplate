/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from 'containers/HomePage/Loadable';
import PartDetail from 'containers/PartsDetail/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
    }
  }

  componentDidMount(){
  }

  render() {
    return(
      <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
      </Switch>
      </div>
    )
  }
}

