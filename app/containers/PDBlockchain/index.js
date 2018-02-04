/*
 * PDBlockchain
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';

export default class PDBlockchain extends React.Component {
  componentWillMount() {}

  // async getChain(vin) {
  //   try {
  //     const data = await pd(vin);
  //     this.props.setVinData(data);
  //   } catch (e) {
  //     console.log(e);
  //     alert(e);
  //   }
  // }

  render() {
    return (
      <div>
        <Helmet>
          <title>Our Blockchain Explorer </title>
          <meta name="description" content="Concepts page" />
        </Helmet>
        {'Here yo!'}
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <List>
          <ListItem>
            <ListItemTitle>
              <FormattedMessage {...messages.scaffoldingHeader} />
            </ListItemTitle>
            <p>
              <FormattedMessage {...messages.scaffoldingMessage} />
            </p>
          </ListItem>

          <ListItem>
            <ListItemTitle>
              <FormattedMessage {...messages.feedbackHeader} />
            </ListItemTitle>
            <p>
              <FormattedMessage {...messages.feedbackMessage} />
            </p>
          </ListItem>
        </List>
      </div>
    );
  }
}
