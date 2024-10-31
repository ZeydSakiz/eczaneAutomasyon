const { ApolloServer, gql } = require('apollo-server');
const userTypeDefs = require('./schema')
const medicationResolvers = require('../medications/resolvers')
const medicationTypeDefs = require('../medications/schema')
const {connectToDb,getDb} = require('../../../db/db')
const user_medication = []



const user_medicationResolvers = {
  Query: {
    getuser_medication: async () => {
      const db=getDb();
      return await db.collection('user_medication').find().toArray();
    }
  },
  
  Mutation: {
 
    adduser_medication: async (_,{userId, medicationId, dose, startDate, endDate}) => {
      const db = getDb();
      const result = await db.collection('user_medication').insertOne({userId, medicationId, dose, startDate, endDate});
        return{id: result.insertedId,userId,medicationId,dose,startDate,endDate}
      
    },  
  },



};
module.exports = user_medicationResolvers;


