const { ApolloServer, gql } = require('apollo-server');
const userTypeDefs = require('./schema')
const medicationResolvers = require('../medications/resolvers')
const medicationTypeDefs = require('../medications/schema')
const {connectToDb,getDb} = require('../../../db/db');
const { ReturnDocument } = require('mongodb');
const {ObjectId} = require('mongodb');



const userResolvers = {
  Query: {
    getAllUsers: async (_,{}) => {
      
      const db = getDb();
      const users = await db.collection('users').find().toArray();
      return users
    },
    getUserById: async (parent,args, { _id =new ObjectId(args._id)} ) => {
      const db = getDb()
      const result = await db.collection('users').findOne({_id})
      console.log(result)
      return result
     
    }
  },
  User: {
    medications: async (parent,_,{Medications}) => {
      const medications = await medications.find({_id:{$in: parent.medications}})
      
     const db = getDb();
      return await db.collection('medications').find({_id}).toArray();
     }
},
  Mutation: {
     addUser: async (parent, args, { db }) => {
      const input = args.input; 
      const _id = input._id ? new ObjectId(input._id) : new ObjectId(); 
  
      const newInput = {
        ...input,
        _id, 
        ...(input._id ? {} : { createdDate: new Date().toISOString() }), 
        updatedDate: new Date().toISOString(), 
      };
  
      
      const result = await db.collection('users').updateOne(
        { _id }, 
        { $set: newInput }, 
        { upsert: true } 
      );
  
      console.log("Result:", result);
      console.log("New/Updated Input:", newInput);
  
      return {
        _id: _id.toString(),
        ...newInput,
      };
    },
    /*
  addUser: async (parent,args, {input}) =>{
        const db = await getDb();
        const newInput = {...args.input,
          _id: input?._id ?? undefined,
          ...(!input?._id ? { createdDate: new Date().toISOString() } : {}),
          updatedDate:new Date().toISOString(),
        
        }; 
        //şimdilik tek resolver adduser üzerinden id aynı ise güncelle farklı ise yeni kişi kaydetme üzerinden çalışacağız

        const result = await db.collection('users').insertOne( newInput);
        console.log(result)
        console.log("new",newInput);
        return ({_id:result.insertedId})
       
      },  */
  },
 };
  module.exports = userResolvers;

  