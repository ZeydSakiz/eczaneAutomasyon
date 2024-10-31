const express = require('express');
const { ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.
const {mergeTypeDefs, mergeResolvers} = require('@graphql-tools/merge') ;
const {userTypeDefs,userResolvers, medicationTypeDefs,medicationResolvers, user_medicationTypeDefs, user_medicationResolvers} = require ('./src/modules/index');
const {getDb} = require('./db/db')
const typeDefs = mergeTypeDefs([userTypeDefs, medicationTypeDefs,user_medicationTypeDefs]);
const resolvers = mergeResolvers([userResolvers, medicationResolvers,user_medicationResolvers]);
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
 