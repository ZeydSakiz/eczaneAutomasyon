const { ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.
const userResolvers = require('./resolvers')
const medicationResolvers = require('../medications/resolvers')
const medicationTypeDefs = require('../medications/schema')


const userTypeDefs = gql` 
 
type Query{
     users: [User]
}

type User{
     id: ID!
     name:String
     age:Int
     gender:String
     sickness:String   
     medications:[ID]
     createDate:String
     upgradeDate:String
}

input UserInput{ 
     name: String!
     age:Int!
     sickness:String
     gender:String
     medications:[ID]
     createDate:String
     upgradeDate:String
}

type Mutation{
    addUser(input: UserInput!): User
    updateUser(mail:String):User
}

`
;
module.exports = userTypeDefs;
