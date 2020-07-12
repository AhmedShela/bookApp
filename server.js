'use strict';
require('dotenv').config()
const express = require('express');
const server = express();
const PORT = process.env.PORT;

server.use(express.static('./public'));

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.set('view engine','ejs');

server.get('/hello',(req,res)=>{
    res.render('./pages/index.ejs');
})

server.listen(PORT,() =>{
console.log(`listening to port : ${PORT}`);
});