const { ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.
const medicationResolvers = require('./resolvers')
const mongoose = require('mongoose')
const ObjectId = require('mongodb')
const userResolvers = require('../user/resolvers')

const medicationTypeDefs = gql` 
 

type GetMedicationByIdResponse {
  medications: Medications!
  user: User!
}
type Query{
   getMedicationById(_id:ID!):GetMedicationByIdResponse!
   medications:[Medications]!
   
}

type Medications{ 
     _id:ID
     medTitle:String!
     content:String!
     pill: Boolean
     users:[ID]
     createDate:String
     updateDate:String
}

input MedicationInput{
   _id:ID
   medTitle:String!
   content:String!
   pill:Boolean
   users:[ID]
   createDate:String
   updateDate:String
   
}

type Mutation{
     addMedication(input:MedicationInput! ):Medications
}
  
`;
module.exports = medicationTypeDefs;
