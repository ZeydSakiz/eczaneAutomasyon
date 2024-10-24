const {MongoClient} = require('mongodb');
require('dotenv').config();

let dbConnection;

module.exports={


connectToDb:(cb)=>{

MongoClient.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
.then((client)=>{
    dbConnection = client.db()
         return cb()
    }).catch(err =>{
        console.log(err);
         return cb(err);
    });
  
},
        getDb:() => dbConnection

}
 