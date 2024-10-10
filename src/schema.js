const { ApolloServer, gql } = require('apollo-server');  //apollo server ve gql fonskionnu dahil ediyoruz Graphql şemasını tanımlamak için kullanılıyor.

// GraphQL şeması   //Graphql şemasını tanımlamak için kullanıyoruz

const users =[ 
    { id:'1', name:'Ali', age:'64',sickness:'grip'},
    {id:'2', name:'Mehmet', age:'72',sickness:'mide bulanmasi'},
];
const medications=[
    {id:'1', medTitle:'arveles',content:'for the headhack',author:'1',pill:true},
    {id:'2',medTitle:'aferin',content:'for the stomache',author:'2',pill:false}
]

//graphql şeması sistemdki veri tiplerini ve hangi sorguların kullanılabileceğini belirler.
const typeDefs = gql` 
 
type Query{
     users: [User]
   medications:[Medications]
   
}
type Mutation{
    addUser(name:String!, age:Int, sickness:String): User
     addMedication(medTitle:String!, author:ID!, pill:Boolean, content:String!):Medications
  
  
}

type User{
     id: ID!
     name:String!
     age:Int
     sickness:String
     medications:[Medications]
}


  type Medications{
     id:ID!
     medTitle:String!
     content:String!
     author: User
     pill: Boolean

}
`;
module.exports = typeDefs;
