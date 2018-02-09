/*
 * PartsDetectHome
 *
 * This is the first thing users see of our App, at the '/' route
 */

import { slideOutRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import axios from 'axios';
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
    animationName: Radium.keyframes(slideOutRight, 'slideOutRight'),
  },
  button: {
    border: 'solid red',
  },
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

  componentDidMount() {
    axios('http://159.89.159.211:5000/mine');
    this.getChain();
  }

  async getChain() {
    try {
      const arr = [];
      const data = await axios('http://159.89.159.211:5000/chain');
      data.data.chain.map((chainHX) => {
        if (chainHX.transactions.length > 0) {
          chainHX.transactions.map((trx) => {
            if (trx.eventDetails !== undefined) {
              console.log('trx', trx);
              if (trx.eventDetails.vin === this.props.vin) {
                arr.push(trx);
              }
            }
          });
        }
      });
      this.setState({ data: arr });
    } catch (e) {
      alert(e);
    }
  }

  render() {
    const { anchor, split, noInfo } = styles;

    if (this.state.data.length === 0) {
      return (
        <div style={noInfo}>{`No history for this vehicle ${
          this.props.vin
        } please go back to demo and submit a vin`}</div>
      );
    }
    return (
      <div style={anchor}>
        <div />
        <article style={split}>
          <Helmet>
            <title>Parts Detect ICO MVP</title>
            <meta name="description" content="Parts Detect ICO MVP" />
          </Helmet>
          <div>
            <div>
              <CenteredSection>
                <H2>VIN : {this.props.vin}</H2>
              </CenteredSection>
              <div>
                <H2>History</H2>
                <div style={{ border: 'solid green 2px' }}>
                  {this.state.data.map((trxHx) => (
                    <div>
                      {`${trxHx.eventDetails.type} installation event`}
                      <br />
                      {`Name: ${trxHx.eventDetails.type}`}
                      <br />
                      {`No: ${trxHx.eventDetails.partsNumber ||
                        trxHx.eventDetails.prodcedure}`}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
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
