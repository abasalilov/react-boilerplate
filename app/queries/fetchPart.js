import gql from 'graphql-tag';

export default gql`
query partQuery($part: Int!) {
    partRow(part:$part){
      part
      fileName
      finalIMGUrl
      folderName
      MFGPartNum
    }
}`


// "GraphQLError: Syntax Error GraphQL request (3:3) Expected Name, found {
//
// 2: query partQuery($part: ID!) {
//   3:   {
//   ^
//     4:     partRow(part:$part){
//
//       at syntaxError (webpack:///./node_modules/graphql/error/syntaxError.js?:31:15)
//       at expect (webpack:///./node_modules/graphql/language/parser.js?:973:32)
//       at parseName (webpack:///./node_modules/graphql/language/parser.js?:91:15)
//       at parseField (webpack:///./node_modules/graphql/language/parser.js?:276:21)
//       at parseSelection (webpack:///./node_modules/graphql/language/parser.js?:265:72)
//       at many (webpack:///./node_modules/graphql/language/parser.js?:1022:16)
//       at parseSelectionSet (webpack:///./node_modules/graphql/language/parser.js?:253:17)
//       at parseOperationDefinition (webpack:///./node_modules/graphql/language/parser.js?:189:19)
//       at parseDefinition (webpack:///./node_modules/graphql/language/parser.js?:136:16)
//       at parseDocument (webpack:///./node_modules/graphql/language/parser.js?:109:22)"


// {
//   partRow(part:22){
//   part
//   fileName
//   finalIMGUrl
//   folderName
//   MFGPartNum
// }
// }
