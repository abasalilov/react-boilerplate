/*
 * PartsDetectHome
 *
 * This is the first thing users see of our App, at the '/' route
 */

import axios from 'axios';
import React from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectVin } from './selectors';
import reducer from './reducer';
import saga from './saga';
require('./blockchainexplorer.css');

const styles = {
  h3: {
    float: 'right',
  },
  clear: {
    display: 'none',
  },
  h4: {
    float: 'right',
  },
  loading: {
    marginTop: '5rem',
    borderRadius: '100px',
    backgroundColor: '#f2efba',
    width: '100%',
    height: '400px',
    lineHeight: '3.5rem',
    display: 'flex',
    fontSize: '1.6rem',
    fontWeight: 600,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3rem',
  },
  anchor: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vin: {
    float: 'right',
  },
};

const Transaction = (props) => {
  const { data } = props;
  return (
    <div className="item">
      <span className="line">Transaction Type: {data.type}</span>
      <br />
      <span className="line">Submitted: {data.stamp}</span>
      <br />
      <span className="line">Part: {data.part}</span>
    </div>
  );
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
      loading: false,
    };
  }

  componentDidMount() {
    // axios('http://159.89.159.211:5000/mine');
    this.getChain();
  }

  async getChain() {
    try {
      // const arr = [];
      const data = await axios('http://159.89.159.211:5000/chain');
      const stampedData = getStampedTransactions(
        data.data.chain,
        this.props.vin
      );
      // console.log('stamped', stampedData);
      // data.data.chain.map((chainHX) => {
      //   if (chainHX.transactions.length > 0) {
      //     this.setState({ loading: true });
      //     chainHX.transactions.map((trx) => {
      //       if (trx.eventDetails !== undefined) {
      //         if (trx.eventDetails.vin === this.props.vin) {
      //           arr.push(trx);
      //         }
      //       }
      //     });
      //     this.setState({ loading: false });
      //   }
      // });
      this.setState({ data: stampedData });
      // console.log('stamped', stampedData);
    } catch (e) {
      alert(e);
    }

    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  render() {
    const { anchor, split, loading, centered, vin } = styles;

    if (this.state.data.length === 0) {
      return (
        <div style={loading}>
          {`Loading history for vehicle ${this.props.vin} please wait...`}
          <i className="fa fa-cog fa-spin fa-2x fa-fw" />
        </div>
      );
    }
    return (
      <div style={anchor}>
        <article style={split}>
          <Helmet>
            <title>Parts Detect ICO MVP</title>
            <meta name="description" content="Parts Detect ICO MVP" />
          </Helmet>
          <div style={centered}>
            <h3>Transaction History</h3>
            <div style={vin}>VIN : {this.props.vin}</div>
            {this.state.data.map((trx) => (
              <Transaction key={Math.random()} data={trx} />
            ))}
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

function getStampedTransactions(data, vin) {
  const maint = [];
  const install = [];
  const one = data.map((trx) => {
    const timeStamp = new Date(trx.timestamp);
    if (trx.transactions.length > 1) {
      trx.transactions.map((subTrx) => {
        if (subTrx.eventDetails && subTrx.eventDetails.vin === vin) {
          const event = subTrx.eventDetails;
          event.stamp = timeStamp.toString();
          install.push(event);
        }
      });
    }
  });
  // console.log('install', install);
  return install;
}

// <div style={{ border: 'solid green 2px' }}>
// {this.state.data.map((trxHx) => (
//   <div>
//     {`${trxHx.eventDetails.type} installation event`}
//     <br />
//     {`${trxHx.eventDetails.part}`}
//     <br />
//     {`Name: ${trxHx.eventDetails.type}`}
//     <br />
//     {`No: ${trxHx.eventDetails.partsNumber ||
//       trxHx.eventDetails.prodcedure}`}
//   </div>
// ))}
// </div>
