const { ApolloServer, gql } = require('apollo-server');
const userTypeDefs = require('./schema')
const medicationResolvers = require('../medications/resolvers')
const medicationTypeDefs = require('../medications/schema')
const {connectToDb,getDb} = require('../../../db/db');
const { ReturnDocument } = require('mongodb');
const {ObjectId} = require('mongodb');
const NodeCache = require("node-cache");
const cache = new NodeCache({stdTTL:60});


const userResolvers = {
  Query: {
    getAllUsers: async (_,{}) => {
      const db = getDb();
      const users = await db.collection('users').find().toArray();
      return users
    },
    getUserById: async (parent, args, { db }) => {
      _id=args._id

      const cachedUser = cache.get(`user_${_id}`)
      if (cachedUser){
        console.log("cacheden kullanıcı verisi döndü")
        return cachedUser
      }
      const user = await db.collection('users').findOne({ _id: new ObjectId(args._id) });
      if(!user){
        console.log("kullanıcı bulunamadı");
      }
      cache.set(`user_${_id}`, user)
      console.log("veri tabanından cache eklendi")
      return user; 
    }
  },
  User:{
    medications: async (parent, args, { db }) => {
      const medicationIds = parent.medications; 
      if(!medicationIds){
        return null }
       return await db.collection('medications').find({ _id: { $in: medicationIds.map(id => new ObjectId(id))}}).toArray();
    }},
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
         await db.collection('users').updateOne(
         { _id }, 
         { $set: newInput }, 
         { upsert: true },
       );
       //result tanımlamasını da kaldırdım çünkü result ile User veri tipi uymuyordu eğer veri tipini user a çevirmeye çalışırsam da elle manuel olarak User tipini yazmam gerekşyır resolver a

       console.log("New/Updated Input:", newInput);
       return newInput;
     },
   },
  };
   module.exports = userResolvers;
 

/*
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
//result a newınput un ataması ve console olarak yazdırılmasında bir sıkıntı var onu düzenle
//updateOne,upsertIn kullanımına bak
//
      console.log("qq",result)
      return result;
    },
  },
 };
  module.exports = userResolvers;

  */