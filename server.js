'use strict';
require('dotenv').config()
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3030;

server.use(express.static('./public'));

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.set('view engine','ejs');

server.get('/hello',(req,res)=>{
    res.render('./pages/index.ejs');
});

server.get('/searches/show',(req,res)=>{
res.render('./pages/searches/show.ejs');
})

server.listen(PORT,() =>{
console.log(`listening to port : ${PORT}`);
});