import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import SilverBack from './silver_back.png';
class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="headerLink1">
        <Img src={SilverBack} alt="ico poc" />
      </div>
    );
  }
}

export default Header;
