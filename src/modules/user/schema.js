const { ApolloServer, gql } = require('apollo-server'); 
const mongoose = require('mongoose')
const ObjectId = require('mongodb')
const userResolvers = require('./resolvers')
const medicationResolvers = require('../medications/resolvers')
const medicationTypeDefs = require('../medications/schema')

const userTypeDefs = gql`  
 
type GetUserByIdResponse {
  user: User!
  medications: Medications!
}
type Query{
     getUserById(_id:ID!): GetUserByIdResponse!
     getAllUsers:[User]!
     
}

type User{
     _id:ID
     name:String!
     age:Int!
     gender:String!
     sickness:String!   
     createDate:String 
     upgradeDate:String
     medications:[ID]
}

input UserInput{ 
     _id:ID
     name: String
     age:Int
     gender:String 
     sickness:String
     createDate:String
     updateDate:String
     medications:[ID]
    
}
     

type Mutation{
    addUser(input: UserInput!): User
}

`

module.exports = userTypeDefs;
