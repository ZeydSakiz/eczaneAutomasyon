const express = require('express');


const {connectToDb,getDb} = require('./db')

const app = express();
app.use(express.json())

let db;

    connectToDb((err) =>{

        if(!err){

            app.listen(3000,() => {
        console.log(`🚀 Sunucu çalışıyor:`);
         })
         db=getDb()

    }
});

app.get('/api',(req,res)=>{
    let users = [];
    db.collection('users')
    .find()
    .sort({kitapAd:-1})
    .forEach(user => users.push(user))
    .then(() => {
        res.status(200).json(users)
    })
        .catch(()=>{
             res.status(500).json({hata:'verilere erişilemedi'})   
        })
})

app.post('/api', (req,res)=>{

    const user = req.body;

    db.collection('users')
    .insertOne()
    .then(sonuc=>{
        res.status(201).json(sonuc)
    })
    .catch(err=>{
        res.status(501).json({hata:'veri eklenemedi'})
    })
})



  
