const { ApolloServer, gql } = require('apollo-server');
const userTypeDefs = require('./schema')
const medicationResolvers = require('../medications/resolvers')
const medicationTypeDefs = require('../medications/schema')
const {connectToDb,getDb} = require('../../../db/db')

const userResolvers = {
    Query: {
      users: async (_,{input}) => {
        const db = await getDb();
        const users = await db.collection('users').find(input).toArray();
        return users.map(user => ({
          id: user._id,
          ...user.input  }));
      },
      
  },
  User: {
    medications: async (parent) => {
      const db = getDb();
      return await db.collection('medications').find({User:parent.id}).toArray();
     }
},
  
  Mutation: {
      addUser: async (_, {input}) =>{
        const db = await getDb();
        

    
        
        const result = await db.collection('users').insertOne({input, createDate: new Date().toISOString()});
        
        return {id: result.insertedId, input}
      
         
      }
  }

 };
  
  module.exports = userResolvers;