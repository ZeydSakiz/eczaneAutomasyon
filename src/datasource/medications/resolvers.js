const { ApolloServer, gql } = require('apollo-server');
const medicationTypeDefs = require('./schema')


const medications=[
    {id:'1', medTitle:'arveles',content:'for the headhack',pill:true},
    {id:'2',medTitle:'aferin',content:'for the stomache',pill:false},
    {id:'3',medTitle:'Ketorolak',content:'for the tooth',pill:false},
    {id:'4',medTitle:'Sulindak',content:'for the back',pill:false},
    {id:'5', medTitle:'Tolmetin',content:'for the shoulders',pill:true}
    
    
]
const medicationResolvers = {
    Query: {
      medications:() => medications
  },
  Mutation: {
   
      addMedication: (_,{medTitle, content, pill}) => {
          const newMedication = {id:String(medications.length + 1),medTitle, content, pill};
          medications.push(newMedication);
          return newMedication;
      },  
  },
 
 
  };

   /*const server = new ApolloServer({ 
    typeDefs: medicationTypeDefs ,
    resolvers: medicationResolvers});  */
    
  module.exports = medicationResolvers; 