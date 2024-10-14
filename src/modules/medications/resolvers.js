const { ApolloServer, gql } = require('apollo-server');
const medicationTypeDefs = require('./schema')


const medications=[
    {id:'1', medTitle:'arveles',content:'for the headhack',pill:true, userId:'1'},
    {id:'2',medTitle:'aferin',content:'for the stomache',pill:false, userId:'2'},
    {id:'3',medTitle:'Ketorolak',content:'for the tooth',pill:false, userId:'3'},
    {id:'4',medTitle:'Sulindak',content:'for the back',pill:false, userId:'4'},
    {id:'5', medTitle:'Tolmetin',content:'for the shoulders',pill:true, userId:'5'}
];
    
    

const medicationResolvers = {
    Query: {
      medications:() => medications
  },
  Mutation: {
   
      addMedication: (_,{medTitle, content, pill}) => {
          const newMedication = {id:String(medications.length + 1),medTitle, content, pill, userId};
          medications.push(newMedication);
          return newMedication;
      },  
  },
 
 
  };

   /*const server = new ApolloServer({ 
    typeDefs: medicationTypeDefs ,
    resolvers: medicationResolvers});  */
    
  module.exports = medicationResolvers; 