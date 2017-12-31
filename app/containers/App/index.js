/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import PartsDetectHome from 'containers/PartsDetectHome/Loadable';
import Home from 'containers/Home/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  width:"100%",
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet defaultTitle="Parts Detect ICO MVP">
          <meta name="description" content="Parts Detect ICO MVP" />
        </Helmet>
        <div style={{ border: 'green dotted', width: '100%' }}>
          <AppWrapper>
            <Header />
            <Switch>
              <Route exact path="/" component={PartsDetectHome} />
              <Route path="/concepts" component={FeaturePage} />
              <Route path="/search" component={Home} />
            </Switch>
          </AppWrapper>
        </div>
      </div>
    );
  }
}

export default App;
