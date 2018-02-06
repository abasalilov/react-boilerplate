/*
 * Menu
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React from 'react';
import vins from './sampleVins';
import { slideInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  slideInLeft: {
    borderRadius: '100px',
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft'),
    width: '15rem',
    height: '2.2rem',
    margin: '1rem',
    border: 'solid #fabd44',
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
            {VIN}
          </button>
        ))}
      </StyleRoot>
    );
  }
}
