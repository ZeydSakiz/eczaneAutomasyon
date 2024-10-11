const { ApolloServer, gql } = require('apollo-server');
const userTypeDefs = require('./schema')
// Resolvers // sorguları nasıl yanıtlayacağımızı tanımlıyorz resolvers kısmında
const users =[ 
    { id:'1', name:'Ali', age:'64', gender:"male ", sickness:'grip'},
    {id:'2', name:'Mehmet', age:'72', gender:"male ", sickness:'mide bulanmasi'},
    {id:'3', name:'Ayşe', age:'42', gender:"female ", sickness:'dis agrisi'},
    {id:'4', name:'Mert', age:'52', gender:"male ", sickness:'bel agrisi'},
    {id:'5', name:'Jhon', age:'79', gender:"male ", sickness:'omuz Agrisi'}
];

const userResolvers = {
    Query: {
      users: () => users
      
  },
  Mutation: {
      addUser:(_, {name, age, gender, sickness}) =>{
          const newUser = {id:String(users.length + 1), name, age, gender, sickness};
          users.push(newUser);
          return newUser;
      }
  }
 
 };
  
    /* Apollo Server oluştur  
    const server = new ApolloServer({ 
    typeDefs: userTypeDefs, 
    resolvers: userResolvers ,
    });     */

  module.exports = userResolvers;