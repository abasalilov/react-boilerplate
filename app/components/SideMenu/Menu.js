/*
 * Menu
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import H3 from 'components/H3';
import vins from './sampleVins';
import { slideInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  slideInLeft: {
    border: 'red solid',
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft'),
    width: '15rem',
    margin: '.2rem',
  },
};

export default class SideMenu extends React.Component {
  render() {
    const { onChangeVin } = this.props;
    const { button } = styles;
    return (
      <StyleRoot>
        {vins.map(({ VIN }) => (
          <button
            style={styles.slideInLeft}
            onClick={() => onChangeVin(VIN)}
            key={VIN}
          >
            <ul>{VIN}</ul>
          </button>
        ))}
      </StyleRoot>
    );
  }
}
