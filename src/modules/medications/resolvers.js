const { ApolloServer, gql } = require('apollo-server');
const medicationTypeDefs = require('./schema')
const {connectToDb,getDb} = require('../../../db/db')


/*const medications=[
    {id:'1', medTitle:'arveles',content:'for the headhack',pill:true, userId:'1'},
    {id:'2',medTitle:'aferin',content:'for the stomache',pill:false, userId:'2'},
    {id:'3',medTitle:'Ketorolak',content:'for the tooth',pill:false, userId:'3'},
    {id:'4',medTitle:'Sulindak',content:'for the back',pill:false, userId:'4'},
    {id:'5', medTitle:'Tolmetin',content:'for the shoulders',pill:true, userId:'5'}
];
    */
    

const medicationResolvers = {
    Query: {
      medications: async () => {
        const db=getDb();
        return await db.collection('medications').find().toArray();
      }
  },
  Mutation: {
   
      addMedication: async (_,{medTitle, content, pill,author}) => {
        const db = getDb();
        const result = await db.collection('medications').insertOne({medTitle, content,pill, author});
          return{id:result.insertedId, medTitle, content,pill, author}
        //const newMedication = {id:String(medications.length + 1),medTitle, content, pill, userId};
          //medications.push(newMedication);
          //return newMedication;
      },  
  },
  Medications:{
        author: async (parent)=> {
         const db = getDb();
             return await db.collection('users').findOne({_id:parent.author});
    },  

  },
 
 
  };

   /*const server = new ApolloServer({ 
    typeDefs: medicationTypeDefs ,
    resolvers: medicationResolvers});  */
    
  module.exports = medicationResolvers; 