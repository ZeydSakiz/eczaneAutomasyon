const { ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
dataSources: () => {
  return{
 
   };
  },

});


// Sunucuyu başlat // port numarası belirtmezsek apollo server varsayılan olarak 4000 portunda başlatıyor çalışmayı.
server.listen().then(({ url }) => {
  console.log(`🚀 Sunucu çalışıyor: ${url}`);
});
