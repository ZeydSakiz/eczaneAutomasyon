const { ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.
const medicationResolvers = require('./resolvers')
// GraphQL şeması   //Graphql şemasını tanımlamak için kullanıyoruz



//graphql şeması sistemdki veri tiplerini ve hangi sorguların kullanılabileceğini belirler.
const medicationTypeDefs = gql` 
 
type Query{
   medications:[Medications]
   
}
type Mutation{
     addMedication( medTitle:String!, content:String!, pill:Boolean, author: ID):Medications
  
  
}
  type Medications{
     _id:ID!
     medTitle:String!
     content:String!
     pill: Boolean
     author: [User]

}
`;
module.exports = medicationTypeDefs;
