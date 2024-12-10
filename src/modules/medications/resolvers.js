const { ApolloServer, gql } = require('apollo-server');
const medicationTypeDefs = require('./schema')
const {connectToDb,getDb} = require('../../../db/db');
const { get } = require('mongoose');
const {ObjectId} = require('mongodb');

const medicationResolvers = {
    Query: {
      medications: async (parent,{}) => {
        const db = await getDb();
        const medications = await db.collection('medications').find().toArray();
        console.log(medications)
        return medications;
      },

      getMedicationById:async(parent,args,{_id = new ObjectId(args._id)})=>{
        const db =getDb();
        const result = await db.collection('medications').findOne(_id);
        if(!result){
          console.log("ilac bulunamadı",result)
        }
        return result;
      }
    },
    Medications:{

      users: async (parent, args, { db }) => {
        const userIds = parent.users;
        if(!userIds){
          return null}
       {return await db.collection('users').find({ _id: { $in: userIds.map(id => new ObjectId(id)) } }).toArray();}
      }
    },
    Mutation: {
      addMedication: async (parent,args,{db}) => {
        const input = args.input
        const _id =  input._id ? new ObjectId(input._id) : new ObjectId(); 
        const newInput = {
          ...input,
          _id, 
          ...(input._id ? {} : { createdDate: new Date().toISOString() }), 
          updatedDate: new Date().toISOString(), 
        };

        const result = await db.collection('medications').updateOne(
          {_id},
          {$set:newInput},
          {upsert:true}
        );
       console.log(newInput);
       return result
      },  
    },
  };   
  module.exports = medicationResolvers; 