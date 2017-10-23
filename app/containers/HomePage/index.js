/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import CenteredSection from './CenteredSection'
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import PartsDetail from '../PartsDetail/index';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import saga from './saga';
import axios from 'axios';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      clicked: false,
      partID: null,
      submitted: false
    }
    this.onClickButton = this.onClickButton.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderPartsDetailsPage = this.renderPartsDetailsPage.bind(this)
  }

  renderPartsDetailsPage(){
    console.log('rendering page', this.state)
    return (
      <PartsDetail partId={this.state.partID}/>
    )
  }
  onClickButton(){
    // this.props.history.push('/'+this.state.partID)
    console.log('onClickButton');
    console.log(`passing in ${this.state.partID} as partId into PartsDetails`)
    this.setState({submitted:true})
  }

  onInputChange(e){
    this.setState({partID: e.target.value})
  }

  render() {
    // const { loading, error, repos } = this.props;
    // const reposListProps = {
    //   loading,
    //   error,
    //   repos,
    // };

    return (
      <article>
          <title>Home Page</title>
          <meta name="description" content="A React Redux GraphQL implementation" />
        <div>
          <CenteredSection>
            <H2>
              centered
            </H2>
            <p>
              P
            </p>
            <Section data-GQL='data-section'>
              <H2>
                Here
              </H2>
              <input onChange={this.onInputChange} />
              <button onClick={this.onClickButton} >GJM</button>
              <div>{this.state.submitted ? this.renderPartsDetailsPage() : null}</div>
            </Section>
          </CenteredSection>
        </div>
      </article>
    );
  }
}

export default HomePage
// HomePage.propTypes = {
//   loading: PropTypes.bool,
//   error: PropTypes.oneOfType([
//     PropTypes.object,
//     PropTypes.bool,
//   ]),
//   repos: PropTypes.oneOfType([
//     PropTypes.array,
//     PropTypes.bool,
//   ]),
//   onSubmitForm: PropTypes.func,
//   username: PropTypes.string,
//   onChangeUsername: PropTypes.func,
// };

// export function mapDispatchToProps(dispatch) {
//   return {
//     onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
//     onSubmitForm: (evt) => {
//       if (evt !== undefined && evt.preventDefault) evt.preventDefault();
//       dispatch(loadRepos());
//     },
//   };
// }

// const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
// });

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'home', reducer });
// const withSaga = injectSaga({ key: 'home', saga });

// export default compose(
//   withReducer,
//   withSaga,
//   withConnect,
// )(HomePage);

