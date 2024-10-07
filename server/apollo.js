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
  type Query{
  users: [User]
  medications:[Medications]
}
  type Mutation{
  addUser(name:String!, age:Int, sickness:String): User
  addMedication(medTitle:String!, author:ID!, pill:Boolean, content:String!):Medications
  
  
}
`;

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

// Sunucuyu başlat // port numarası belirtmezsek apollo server varsayılan olarak 4000 portunda başlatıyor çalışmayı.
server.listen().then(({ url }) => {
  console.log(`🚀 Sunucu çalışıyor: ${url}`);
});
