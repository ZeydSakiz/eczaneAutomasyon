const { ApolloServer, gql } = require('apollo-server');
const medicationTypeDefs = require('./schema')
const {connectToDb,getDb} = require('../../../db/db');
const { get } = require('mongoose');
const {ObjectId} = require('mongodb');
const NodeCache = require("node-cache");
const cache = new NodeCache({stdTTL:60});

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
        const cachedMedications = cache.get(`medications${_id}`)
      if (cachedMedications){
        console.log("cacheden ilaç verisi döndü")
        return cachedMedications
      }
       
        const result = await db.collection('medications').findOne(_id);
        if(!result){
          console.log("ilac bulunamadı",result)
        }
        cache.set(`medications${_id}`, result)
      console.log("veri tabanından cache eklendi")
        return result;
      }
    }, 
// veri eklerken node cache kullan veride update olduğunda cache temizlensin query attığımda ilk başta cacheye gidilecek cachede aranacak,cachede bulunmaz ise veri tabanıında aransın ve çekilsin veri tabanından çekilen cacheye atıulsın ve cefap dönülsün
// cache süresi 1 dakika olsun ve log ata aralara cacheden geldiğini göstermek için, cacheden silindiğini falan
//
      //user kısmına yaptığım aynı şeyi buraya da yaptım NewInput olarak döndürüyorum, user kısmı kaldırıldı.
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
       return newInput
      },  
    },
  };   
  module.exports = medicationResolvers; 