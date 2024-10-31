const { ApolloServer, gql } = require('apollo-server');
const medicationTypeDefs = require('./schema')
const {connectToDb,getDb} = require('../../../db/db')


    //createdate, updatedate, şu bilgileri userdaki gibi input olarak baştan ayarla, author kısmını user ile değiştir, medicationu İD olarak sakla ki daha sonra çekebilesin,

const medicationResolvers = {
    Query: {
      medications: async (_,{input}) => {
        const db = await getDb();
        const medications = await db.collection('medications').find(input).toArray();
        return medications.map(medication => ({
          id: medication._id,
          ...medication.input}));
      }
    },

    Medications:{
      users: async (UserInput) => {
        const db = getDb();
        return await db.collection('users').find({UserInput}).toArray();
       }
  },
    Mutation: {
   
      addMedication: async (_,{input}) => {
        const db = await getDb();

        const result = await db.collection('medications').insertOne({input});
          return{id: result.insertedId, input}
       
      },  
    },
  
 
 
  };

     
  module.exports = medicationResolvers; 