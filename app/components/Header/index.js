import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from './logo.png';
import messages from './messages';

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="headerLink1">
        <Img src={Logo} alt="ico poc" />
        <NavBar>
          <HeaderLink
            className="white-button w3-button w3-btn w3-hover-red"
            to="/"
          >
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink
            className="white-button w3-button w3-btn w3-hover-red"
            to="/pdbc"
          >
            <FormattedMessage {...messages.features} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
