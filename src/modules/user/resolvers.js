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

    getUserById: async (parent,args, { _id = new ObjectId(args._id)})=>{
      const db = getDb();
      const result = await db.collection('users').findOne({ _id });
      if (!result) {
        throw new Error("Kullanıcı bulunamadı.");
      }

      const medication = await db.collection('medications').findOne({_id:new ObjectId(result.medications[0])});
      if(!medication){
        console.log("ilaç bulunamadı",_id)
      }
      result.medications=[medication];
      console.log(result,medication)
      return result;
        
      
      
    },//selçuk beyin feed örneğindeki gibi bri yapı oluşturman ordaki parantezdeki örneği sen if medicationv varsa olarkq düzenleyebilirsin
    
   
/*  
    getUserById: async (parent,args, { _id = new ObjectId(args._id) } ) => {
      const db = getDb()
      const result = await db.collection('users').findOne({_id})
      if(!result){
        throw new Error("kullanıcı bulunamadı..")
      }
      var a = result.medications[0]
      const medi = await db.collection('medications').find(id = new ObjectId(a)).toArray()
      console.log(result,"qweqwe:",medi)
      return result
      
      
      
    },*/
    
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
        result
      };
    },
  },//medications idsi ile veri tabaınından sorgu alıp bilgileri döndüreceksin
  //id ile istek atma durumuna bak feed
 };
  module.exports = userResolvers;

  