/*
 * SearchPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import { slideOutRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import pd from 'pdvindecoder/lib';

import React from 'react';
import PropTypes from 'prop-types';
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
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
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
  input: {
    border: 'solid black 2px',
    width: '13rem',
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
    border: 'solid red',
  },
};

export class SearchPage extends React.Component {
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
      console.log(e);
      alert(e);
    }
  }

  render() {
    console.log('props', this.props);
    const { setSlideMenu, slideMenuOpen, onChangeVin, vin } = this.props;
    const {
      queryContainer,
      h3,
      button,
      anchor,
      split,
      input,
      queryRow,
      subHeader,
      vinData,
      clear,
    } = styles;
    return (
      <div style={anchor}>
        <div>
          {slideMenuOpen ? <SideMenu onChangeVin={onChangeVin} /> : <div />}
        </div>
        <article style={split}>
          <Helmet>
            <title>Parts Detect ICO MVP</title>
            <meta name="description" content="Parts Detect ICO MVP" />
          </Helmet>
          <div>
            {console.log('vin', slideMenuOpen)}
            <div>
              <CenteredSection>
                <H2>Early Features</H2>
              </CenteredSection>
              <Section>
                <div style={queryContainer}>
                  <H3 style={h3}>Enter Your VIN</H3>
                  <div style={queryRow}>
                    <input
                      style={input}
                      value={vin === '' ? '' : vin}
                      placeholder="19UUA56602A801534"
                      onChange={(evt) => onChangeVin(evt.target.value)}
                    />
                    <div style={subHeader}>
                      <button onClick={() => setSlideMenu(!slideMenuOpen)}>
                        No Vin handy? Click here
                      </button>
                    </div>
                  </div>
                  <button style={button} onClick={() => this.handleSubmit(vin)}>
                    Click here
                  </button>
                </div>
              </Section>
              <div>
                <H2>Search Results</H2>
                <div style={{ border: 'solid black 2px', height: '3rem' }}>
                  {vin}
                </div>
                {this.props.vinData === '' ? null : (
                  <div>
                    <a href="/searchParts">Search for parts</a>
                    <List items={this.props.vinData} component={() => {}} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

SearchPage.propTypes = {
  vin: PropTypes.string,
  setVinData: PropTypes.func,
  onChangeVin: PropTypes.func,
  setSlideMenu: PropTypes.func,
  vinData: PropTypes.object,
  slideMenuOpen: PropTypes.bool,
};

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

export default compose(withReducer, withSaga, withConnect)(SearchPage);
