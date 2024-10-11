const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema')
// Resolvers // sorguları nasıl yanıtlayacağımızı tanımlıyorz resolvers kısmında
const users =[ 
    { id:'1', name:'Ali', age:'64',sickness:'grip'},
    {id:'2', name:'Mehmet', age:'72',sickness:'mide bulanmasi'},
    {id:'3', name:'Ayşe', age:'42',sickness:'dis agrisi'},
    {id:'4', name:'Mert', age:'52',sickness:'bel agrisi'},
    {id:'5', name:'Jhon', age:'79',sickness:'omuz Agrisi'}
];
const medications=[
    {id:'1', medTitle:'arveles',content:'for the headhack',author:'1',pill:true},
    {id:'2',medTitle:'aferin',content:'for the stomache',author:'2',pill:false},
    {id:'3',medTitle:'Ketorolak',content:'for the tooth',author:'3',pill:false},
    {id:'4',medTitle:'Sulindak',content:'for the back',author:'4',pill:false},
    {id:'5', medTitle:'Tolmetin',content:'for the shoulders',author:'5',pill:true}
    
    
]
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