const { ApolloServer, gql } = require('apollo-server');
const userTypeDefs = require('./schema')
const medicationResolvers = require('../medications/resolvers')
const medicationTypeDefs = require('../medications/schema')
const {connectToDb,getDb} = require('../../../db/db')
//const medications = require('../medications/resolvers');
// Resolvers // sorguları nasıl yanıtlayacağımızı tanımlıyorz resolvers kısmında
/*const medications = [
    {id:'1', medTitle:'arveles',content:'for the headhack',pill:true, userId:'1'},
    {id:'2',medTitle:'aferin',content:'for the stomache',pill:false, userId:'2'},
    {id:'3',medTitle:'Ketorolak',content:'for the tooth',pill:false, userId:'3'},
    {id:'4',medTitle:'Sulindak',content:'for the back',pill:false, userId:'4'},
    {id:'5', medTitle:'Tolmetin',content:'for the shoulders',pill:true, userId:'5'}
];

const users =[ 
    { id:'1', name:'Ali', age:'64', gender:"male ", sickness:'grip'},
    {id:'2', name:'Mehmet', age:'72', gender:"male ", sickness:'mide bulanmasi'},
    {id:'3', name:'Ayşe', age:'42', gender:"female ", sickness:'dis agrisi'},
    {id:'4', name:'Mert', age:'52', gender:"male ", sickness:'bel agrisi'},
    {id:'5', name:'Jhon', age:'79', gender:"male ", sickness:'omuz Agrisi'}
];
*/
const userResolvers = {
    Query: {
      users: async () => {
        const db = getDb();
        return await db.collection('users').find().toArray();
      }
      
  },
  User: {
    medications: async (parent) => {
      const db = getDb();
      return await db.collection('medications').find({author:parent.id}).toArray();
       
   
  
      //return medications.filter(medications=> medications.userId === parent.id) 
     }
},
  
  Mutation: {
      addUser: async (_, {input}) =>{
        const db = await getDb();

      
        const result = await db.collection('users').insertOne({input});
        
        return {id: result.insertedId, input}
      
         // const newUser = {id:String(users.length + 1), name, age, gender, sickness, medications: [] };
          //users.push(newUser);
         
      }
  }

 };
  
    /* Apollo Server oluştur  
    const server = new ApolloServer({ 
    typeDefs: userTypeDefs, 
    resolvers: userResolvers ,
    });     */

  module.exports = userResolvers;