const express = require('express');
const { ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.
const {mergeTypeDefs, mergeResolvers} = require('@graphql-tools/merge') ;
const {userTypeDefs,userResolvers, medicationTypeDefs,medicationResolvers} = require ('./src/modules/index');
const {getDb} = require('./db/db')
//const app = express();
const typeDefs = mergeTypeDefs([userTypeDefs, medicationTypeDefs]);
const resolvers = mergeResolvers([userResolvers, medicationResolvers]);
const {connectToDb,getDB} = require('./db/db')


getDb();
const server = new ApolloServer({
 typeDefs,
 resolvers
 });

 const app = express();
 app.use(express.json())
 let db;
 
     connectToDb((err) =>{
 
         if(!err){
 
            server.listen().then(({ url }) => {
                console.log(`🚀 Sunucu çalışıyor: ${url}`);
              });
          
          db=getDb()
 
     }
 });
 
 app.get('/api',(req,res)=>{
     let users = [];
     db.collection('users')
     .find()
     .sort({kitapAd:-1})
     .forEach(user => users.push(user))
     .then(() => {
         res.status(200).json(users)
     })
         .catch(()=>{
              res.status(500).json({hata:'verilere erişilemedi'})   
         })
 })
 
 app.post('/api', (req,res)=>{
 
     const user = req.body;
 
     db.collection('users')
     .insertOne()
     .then(sonuc=>{
         res.status(201).json(sonuc)
     })
     .catch(err=>{
         res.status(501).json({hata:'veri eklenemedi'})
     })
 })
 

// Sunucuyu başlat // port numarası belirtmezsek apollo server varsayılan olarak 4000 portunda başlatıyor çalışmayı.

   