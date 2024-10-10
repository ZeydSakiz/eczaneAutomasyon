const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema')
// Resolvers // sorguları nasıl yanıtlayacağımızı tanımlıyorz resolvers kısmında
const resolvers = {
    Query: {
      users: () => users,
      medications:() => medications
  },
  Mutation: {
      addUser:(_, {name, age, sickness}) =>{
          const newUser = {id:String(users.lenght + 1), name, age, sickness};
          users.push(newUser);
          return newUser;
      },
      addMedication: (_,{medTitle, content, author, pill}) => {
          const newMedication = {id:String(medications.lenght + 1),medTitle, content, author, pill};
          medicatiions.push(newMedication);
          return newMedication;
      },  
  },
  User:{
      medications:(parent)=>medications.filter(medications=>medications.author === parent.id),
  
  },
  Medications:{
      author:(parent) =>users.find(user=>user.id === parent.author),
  },
  };
  
  // Apollo Server oluştur // 
  const server = new ApolloServer({ typeDefs, resolvers });

  module.exports = resolvers;