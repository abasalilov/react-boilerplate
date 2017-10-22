const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt
} = graphql;

const partModel = require('../models/index').part;

// const parts = [
//   {
//     part: 2232,
//     fileName:'a',
//     finalIMGUrl:'b',
//     folderName:'c',
//     MFGPartNum: 'd'
//   }
// ]



const PartType = require('./PartType.js');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    partRow:{
      type : PartType,
      args: {part: {type: GraphQLInt}},
      resolve(parentValue, args){
        return partModel.find({
          where: args
        })
          .then( (res) =>  {
          return res
        })
          .catch( (err) => {
            return err;
        })
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: RootQuery
});


module.exports = Schema;


