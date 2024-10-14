const { ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.
const {mergeTypeDefs, mergeResolvers} = require('@graphql-tools/merge') ;
const {userTypeDefs,userResolvers, medicationTypeDefs,medicationResolvers} = require ('./src/modules/index');

const typeDefs = mergeTypeDefs([userTypeDefs, medicationTypeDefs]);
const resolvers = mergeResolvers([userResolvers, medicationResolvers]);

const server = new ApolloServer({
 typeDefs,
 resolvers
 });


// Sunucuyu başlat // port numarası belirtmezsek apollo server varsayılan olarak 4000 portunda başlatıyor çalışmayı.
server.listen().then(({ url }) => {
  console.log(`🚀 Sunucu çalışıyor: ${url}`);
});
    