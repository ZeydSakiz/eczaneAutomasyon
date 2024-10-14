const { ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.
const userResolvers = require('./resolvers')
const medicationResolvers = require('../medications/resolvers')
const medicationTypeDefs = require('../medications/schema')
 // GraphQL şeması   //Graphql şemasını tanımlamak için kullanıyoruz



//graphql şeması sistemdki veri tiplerini ve hangi sorguların kullanılabileceğini belirler.
const userTypeDefs = gql` 
 
type Query{
     users: [User]
  
   
}
type Mutation{
    addUser(name:String!, age:Int, gender:String, sickness:String): User

}
type User{
     id: ID!
     name:String!
     age:Int
     gender:String
     sickness:String   
     medications:[Medications]
}
`
;
module.exports = userTypeDefs;
