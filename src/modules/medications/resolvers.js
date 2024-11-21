const { ApolloServer, gql } = require('apollo-server');
const medicationTypeDefs = require('./schema')
const {connectToDb,getDb} = require('../../../db/db');
const { get } = require('mongoose');
const {ObjectId} = require('mongodb');

    //createdate, updatedate, şu bilgileri userdaki gibi input olarak baştan ayarla, author kısmını user ile değiştir, medicationu İD olarak sakla ki daha sonra çekebilesin,

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
        console.log(result)
        return result; 
      }
    },
    Mutation: {
      addMedication: async (parent,args,{db}) => {
        const input = args.input//addMedication kısmında da id ye göre eğer eşleşen id varsa sorunsuz biçimde güncelleme yapıtor eşleşen id yoksda yeni kullanıcı oluşturuyor
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
      },  
    },
  };   
  module.exports = medicationResolvers; 