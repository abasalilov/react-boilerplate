/*
 * PartsDetectHome
 *
 * This is the first thing users see of our App, at the '/' route
 */
import { slideOutRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import pd from 'pdvindecoder/lib';
import React from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import List from 'components/List';
import H2 from 'components/H2';
import H3 from 'components/H3';
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid black',
  },
  queryRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  subHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
    fontSize: '10px',
    color: 'red',
  },
  input: {
    border: 'solid black 2px',
    width: '13rem',
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
  button: {
    border: 'solid #fabd44',
    borderRadius: '10px',
  },
  sideMenu: {},
  container: {},
  specs: {
    textAlign: 'center',
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
      inputText: '',
    };
    this.updateInputText = this.updateInputText.bind(this);
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

  render() {
    const { setSlideMenu, slideMenuOpen, onChangeVin, vin } = this.props;
    const {
      queryContainer,
      button,
      anchor,
      split,
      input,
      queryRow,
      subHeader,
      sideMenu,
      container,
      details,
      specs,
      btmButton,
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
              </Section>
              <div>
                <CenteredSection>
                  <div style={queryContainer}>
                    <H3>Enter Your VIN</H3>
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
                    <button
                      style={button}
                      onClick={() => this.handleSubmit(vin)}
                    >
                      Submit
                    </button>
                  </div>
                </CenteredSection>
              </div>
            </div>
          </article>
        </div>
        {this.props.vinData && (
          <div>
            <H2 style={specs}>Vehicle Specifications {vin}</H2>
            <div style={details}>*scroll to bottom to submit order</div>
            <List items={this.props.vinData} component={() => {}} />
            <button style={btmButton} onClick={() => this.handleSubmit(vin)}>
              {'Submit Event'}
            </button>
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
