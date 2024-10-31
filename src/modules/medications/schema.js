const { ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.
const medicationResolvers = require('./resolvers')

const medicationTypeDefs = gql` 
 
type Query{
   medications:[Medications]
   
}

type Medications{
     medTitle:String
     content:String
     pill: Boolean
     users: [ID]
}

input MedicationInput{
   medTitle:String!
   content:String!
   pill:Boolean
   users:[ID]
   
}

type Mutation{
     addMedication(input:MedicationInput! ):Medications
}
  
`;
module.exports = medicationTypeDefs;
