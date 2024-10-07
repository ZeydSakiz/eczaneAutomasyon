
var http = require("http");
var fs = require("fs");
const express = require("express");




var server = http.createServer((req, res) =>{

    if(req.url =="/"){
        fs.readFile("home.html",(err,html)=>{
            res.write(html);
            res.end();

        });
        
    } else if(req.url=="/urunler")
        
        fs.readFile("urunler.html", (err,html) =>{
            res.write(html)
            res.end();
        });
        
        else{
            fs.readFile("404.html",(err,html)=>{
                res.write(html);
                res.end();
            } );
        }
        
        ejs

});
server.listen(2999,()=> {
    console.log("node.js.server at port 2999")
});
