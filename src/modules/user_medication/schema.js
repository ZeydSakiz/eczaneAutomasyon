const {ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.
const userResolvers = require('../user/resolvers')
const userTypeDefs = require('../user/schema')
const medicationResolvers = require('../medications/resolvers')
const medicationTypeDefs = require('../medications/schema')
const user_medicationResolvers= require('./resolvers')


const user_medicationTypeDefs = gql`

type user_medication{
    userId: ID
    medicationId: ID
    dose: String
    startDate: String
    endDate: String
  }
    extend type Query{
    getuser_medication(userId:ID):[user_medication]
}
    extend type Mutation{
    adduser_medication(userId: ID, medicationId: ID!, dose: String, startDate: String, endDate: String): user_medication    
}

`;
module.exports = user_medicationTypeDefs;
