/*
 * PartsDetectHome
 *
 * This is the first thing users see of our App, at the '/' route
 */
import { slideOutRight } from 'react-animations';
import axios from 'axios';
import Radium, { StyleRoot } from 'radium';
import pd from 'pdvindecoder/lib';
import React from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import List from 'components/List';
import H2 from 'components/H2';
import SideMenu from 'components/SideMenu';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectSlideMenu,
  makeSelectVin,
  makeSelectVinData,
} from './selectors';
import CenteredSection from './CenteredSection';
import Section from './Section';
import {
  changeVin,
  setSlideMenu as createSetSlideMenuAction,
  loadDecoded,
} from './actions';
import reducer from './reducer';
import saga from './saga';
require('./pdHome.css');

const message1 = 'Close sample vins';
const message2 = 'No Vin handy? Click here';

const styles = {
  queryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '30rem',
  },
  queryRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeader: {
    marginTop: '.25rem',
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
    backgroundColor: 'transparent',
    fontSize: '10px',
    color: 'red',
  },
  input: {
    width: '13rem',
    backgroundColor: 'white',
  },
  clear: {
    display: 'none',
  },
  h4: {
    float: 'right',
  },
  split: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  btn1: {
    border: 'solid #fabd44',
    borderRadius: '10px',
    margin: '.3rem',
  },
  sideMenu: {},
  container: {},
  specs: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    fontSize: '.75rem',
  },
  btmButton: {
    border: 'solid #fabd44',
    borderRadius: '10px',
    float: 'right',
    margin: '1rem',
    width: '10rem',
  },
  actionContainer: {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    margin: '1rem',
  },
  mineSubmit: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '30rem',
    justifyContent: 'space-around',
  },
  btnCircle: {
    backgroundColor: 'white',
    border: 'solid black',
    borderRadius: '100%',
    padding: '1rem .5rem',
    fontSize: '1rem',
    margin: '.3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    border: 'solid #fabd44',
    backgroundColor: 'white',
    width: '100%',
  },
  nextStep: {
    display: 'flex',
    flexDirection: 'row',
    width: '52rem',
  },
  queryGrp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '22rem',
    alignItems: 'center',
  },
  stp4Container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '30rem',
    marginBottom: '1rem',
  },
  eventContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '30rem',
    marginBottom: '1rem',
  },
};

const Step = (props) => (
  <div style={styles.btnCircle} {...props}>
    {`step ${props.num}`}
  </div>
);

export class PartsDetectHome extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state Vin is not null, submit the form to load repos
   */

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      event: 'maintenance',
      eventDetail: 'oil change',
    };
    this.updateInputText = this.updateInputText.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChangeSelectDetail = this.handleChangeSelectDetail.bind(this);
    this.handleBCRequest = this.handleBCRequest.bind(this);
  }
  componentDidMount() {}

  updateInputText(e) {
    this.setState({ inputText: e.target.value });
  }

  async handleSubmit(vin) {
    try {
      const data = await pd(vin);
      this.props.setVinData(data);
    } catch (e) {
      alert(e);
    }
  }

  handleChangeEvent(e) {
    console.log('handle event detail change', e.target.value);
    this.setState({ event: e.target.value });
  }

  handleChangeSelectDetail(e) {
    this.setState({ eventDetail: e.target.value });
  }

  handleBCRequest() {
    if (this.state.event === 'part') {
      const dataToSend = {
        sender: 'senderdude',
        recipient: 'recipientdude',
        amount: '1',
        event: {
          vin: this.props.vin,
          type: this.state.event,
          part: this.state.eventDetail,
          partsNumber: 'PXD785H',
        },
      };
      const url = 'http://159.89.159.211:5000/transactions/event';
      axios
        .post(url, dataToSend)
        .then((feedback) => {
          console.log(feedback);
        })
        .catch((err) => console.log(err));
    } else {
      const dataToSend = {
        sender: 'senderdude',
        recipient: 'recipientdude',
        amount: '1',
        event: {
          vin: this.props.vin,
          type: this.state.event,
          prodcedure: this.state.eventDetail,
        },
      };
      const url = 'http://159.89.159.211:5000/transactions/event';
      axios
        .post(url, dataToSend)
        .then((feedback) => {
          console.log(feedback);
        })
        .catch((err) => console.log(err));
    }

    axios.get('http://138.68.242.58/5000/mine');
    setTimeout(() => {
      this.props.history.push('/pdbc');
    }, 3000);
  }

  render() {
    const { setSlideMenu, slideMenuOpen, onChangeVin, vin } = this.props;
    const {
      queryContainer,
      btn1,
      anchor,
      split,
      input,
      queryRow,
      subHeader,
      sideMenu,
      container,
      stp4Container,
      specs,
      btmButton,
      nextStep,
      eventContainer,
      actionContainer,
      select,
      queryGrp,
    } = styles;
    return (
      <div style={container}>
        <div style={anchor}>
          {slideMenuOpen && (
            <SideMenu style={sideMenu} onChangeVin={onChangeVin} />
          )}
          <article style={split}>
            <Helmet>
              <title>Parts Detect ICO MVP</title>
              <meta name="description" content="Parts Detect ICO MVP" />
            </Helmet>
            <div>
              <Section>
                <H2>Early Feature</H2>
                <div>Blockchain based auto maintenance records</div>
                <li>Submit a vin number</li>
                <li>Select a maintenance operation</li>
                <li>заебись бля</li>
              </Section>
              <div>
                <CenteredSection>
                  <div style={queryContainer}>
                    <Step num={1} />
                    <div style={queryGrp}>
                      <H2>Enter VIN</H2>
                      <div style={queryRow}>
                        <input
                          style={input}
                          value={vin || ''}
                          placeholder="19UUA56602A801534"
                          onChange={(evt) => onChangeVin(evt.target.value)}
                        />
                        <div style={subHeader}>
                          <button onClick={() => setSlideMenu(!slideMenuOpen)}>
                            {slideMenuOpen ? message1 : message2}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CenteredSection>
                <CenteredSection>
                  <div style={queryContainer}>
                    <Step num={2} />
                    <button style={btn1} onClick={() => this.handleSubmit(vin)}>
                      Get Your Car Details
                    </button>
                  </div>
                </CenteredSection>
                {this.props.vinData && (
                  <CenteredSection>
                    <div style={queryContainer}>
                      <Step num={3} />
                      <div style={specs}>Review Specs for {vin} below</div>
                    </div>
                  </CenteredSection>
                )}
              </div>
            </div>
          </article>
        </div>
        {this.props.vinData && (
          <div style={nextStep}>
            <List
              items={this.props.vinData}
              component={() => {}}
              title={'Specifications'}
            />
            <div style={actionContainer}>
              <div style={stp4Container}>
                <Step num={4} />
                <div style={specs}>Select event to record and submit order</div>
              </div>
              <div style={eventContainer}>
                <select
                  style={select}
                  value={this.state.event}
                  onChange={this.handleChangeEvent}
                >
                  <option value="maintenance">Maintenance Event</option>
                  <option value="part">Order Part</option>
                </select>
              </div>
              {this.state.event === 'part' && (
                <div style={eventContainer}>
                  <select
                    style={select}
                    value={this.state.eventDetail}
                    onChange={this.handleChangeSelectDetail}
                  >
                    <option value="Front Brakes">Front Brakes</option>
                    <option value="Rear Brakes">Rear Brakes</option>
                    <option value="Head Light Kit">Head Light Kit</option>
                    <option value="Wind Sheild Wipers">
                      Wind Sheild Wipers
                    </option>
                    <option value="Batteries">Batteries</option>
                  </select>
                </div>
              )}
              {this.state.event === 'maintenance' && (
                <div style={eventContainer}>
                  <select
                    style={select}
                    value={this.state.eventDetail}
                    onChange={this.handleChangeSelectDetail}
                  >
                    <option value="Oil Change">Oil Change</option>
                    <option value="Brake Change">Brake Change</option>
                    <option value="Tire Rotation">Tire Rotation</option>
                    <option value="Radiator Flush">Radiator Flush</option>
                    <option value="Steering Realignment">
                      Steering Realignment
                    </option>
                  </select>
                </div>
              )}
              <div style={queryContainer}>
                <Step num={5} />
                <div style={specs}>Mine & review history</div>
                <button
                  style={btmButton}
                  onClick={() => this.handleBCRequest(vin)}
                >
                  {'Mine & Review'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeVin: (vin) => dispatch(changeVin(vin)),
    setSlideMenu: (bool) => dispatch(createSetSlideMenuAction(bool)),
    setVinData: (data) => dispatch(loadDecoded(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  vin: makeSelectVin(),
  vinData: makeSelectVinData(),
  slideMenuOpen: makeSelectSlideMenu(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(PartsDetectHome);
