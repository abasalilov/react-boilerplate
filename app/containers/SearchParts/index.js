/*
 * PartsDetectHome
 *
 * This is the first thing users see of our App, at the '/' route
 */

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
import { makeSelectParts } from 'containers/App/selectors';
import { makeSelectVin } from './selectors';
import CenteredSection from './CenteredSection';
import Section from './Section';

import {
  changeVin,
  setSlideMenu as createSetSlideMenuAction,
  loadDecoded,
} from './actions';
import reducer from './reducer';
import saga from './saga';

const styles = {};

export class SearchParts extends React.Component {
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
                      value={vin === '' ? null : vin}
                      placeholder="19UUA56602A801534"
                      onChange={(evt) => onChangeVin(evt.target.value)}
                    />
                    <div
                      style={(vin === '') & !slideMenuOpen ? subHeader : clear}
                    >
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

SearchParts.propTypes = {};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(withReducer)(SearchParts);
