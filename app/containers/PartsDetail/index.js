/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchPart from '../../queries/fetchPart'
class PartsDetailPage extends React.Component { // eslint-disable-line
  constructor(){
    super();
    this.state = {
    };
    this.renderLoading = this.renderLoading.bind(this);
  }

  renderImage(url){

        return (
          <div><img src={url} /></div>
        )
  }

  renderLoading(){
    console.log('rendering spinner')
    return (
      <i className="fa fa-spinner" aria-hidden="true"></i>
    )
  }

  renderPartDetails(data){
    console.log('data', data)
    let subSystemString = ''
    const startStr = data.fileName.slice(11);
    const end = startStr.indexOf('/')
    const subSystem = startStr.slice(0, end);
    console.log('subSystem', subSystem);
    const amp = subSystem.indexOf('&') || null;
    if(amp){
      console.log('sub after', amp)
      let firstHalf = subSystem.slice(0, amp);
      let secHalf = subSystem.slice(amp + 1);
      subSystemString = firstHalf+' '+'&'+' '+ secHalf;
    }


    return (
      <div style={{marginTop:'1rem'}}>
        <div style={{display:'flex', direction:'row'}}>
          <div>Sub-System: </div>
          <div style={{paddingLeft:'.5rem'}}>{subSystemString}</div>
        </div>
        <div style={{display:'flex', direction:'row', marginTop:'1rem'}}>
          <div>Manufacturing Number: </div>
          <div style={{paddingLeft:'.5rem'}}>{this.props.data.partRow.MFGPartNum}</div>
        </div>
        <div style={{marginTop:'1rem'}}>
          <div>Image </div>
          <div style={{paddingLeft:'.5rem', justifyContent:'center'}}>{this.renderImage(data.finalIMGUrl)}</div>
        </div>
      </div>
    )
  }

  renderData(){
    return (
      <div style={{marginTop:'2rem'}}>
            <label>Data</label>
            <div>{this.renderPartDetails(this.props.data.partRow)}</div>
      </div>
    )
  }

  render() {

    return (
      <article>
        <title>Part Detail Page</title>
        <meta name="description" content="A React Redux GraphQL implementation" />
        <div style={{paddingTop:'2rem'}}>
          Part Detail from Mysql DB
          <div>
            {this.props.data.partRow ? this.renderData() : this.renderLoading()}
          </div>
        </div>
      </article>
    );
  }
}


// const query = gql` {
//     partRow(part:$partId){
//       part
//       fileName
//       finalIMGUrl
//       folderName
//       MFGPartNum
//     }
//   }`;

export default graphql(fetchPart, {
  options: (ownProps) => { return { variables: { part : ownProps.partId } } }
})(PartsDetailPage)


// export default graphql(CurrentUserForLayout, {
//   options: (ownProps) => ({
//     variables: {
//       id: ownProps.avatarId
//     }
//   })
// })(Profile);
