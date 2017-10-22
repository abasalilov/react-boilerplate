const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt
} = graphql;

const PartType = new GraphQLObjectType({
  name: 'PartType',
  fields: {
    MFGPartNum: {type: GraphQLString},
    fileName:{type: GraphQLString},
    finalIMGUrl:{type: GraphQLString},
    folderName:{type: GraphQLString},
    part:{type: GraphQLInt}
  }
});


module.exports = PartType;
