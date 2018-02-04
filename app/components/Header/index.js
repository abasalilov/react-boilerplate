import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.png';
import messages from './messages';

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="headerLink1" style={{ marginTop: '3rem' }}>
        <Img src={Banner} alt="react-boilerplate - Logo" />
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink className="headerLink2" to="/pdbc">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
