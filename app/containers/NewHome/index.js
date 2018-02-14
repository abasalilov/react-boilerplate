/*
 * PartsDetectHome
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import H2 from 'components/H2';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectVin } from './selectors';
import CenteredSection from './CenteredSection';

import reducer from './reducer';
import saga from './saga';
require('./pdHome.css');

const styles = {
  queryContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '1rem',
  },
  queryRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '1rem',
  },
  subHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
    fontSize: '10px',
    color: 'red',
  },
  h3: {
    float: 'right',
  },
  clear: {
    display: 'none',
  },
  h4: {
    float: 'right',
  },
  noInfo: {
    border: 'solid #fa8f22',
    marginTop: '5rem',
    width: '100%',
    display: 'flex',
    fontSize: '1.6rem',
    fontWeight: 600,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
  },
  loading: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid blue',
  },
  anchor: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  slideOutRight: {
    animation: 'x 1s',
    width: '100%',
  },
  button: {},
};

export class PartsDetectHome extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state Vin is not null, submit the form to load repos
   */

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    const { anchor } = styles;
    return <div style={anchor}>Here yo</div>;
  }
}

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  vin: makeSelectVin(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(PartsDetectHome);
