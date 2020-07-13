'use strict';
require('dotenv').config()
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3030;
const agent = require('superagent')
const pg = require('pg')
const client = new pg.Client(process.env.DB_CONNECTION)

server.use(express.static('./public'));
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.set('view engine','ejs');

server.get('/',getAllBooks);

function getAllBooks(req,res){
let sql = 'SELECT * FROM BOOK_LIST;';
client.query(sql).then((result)=>{
        res.render('./pages/index.ejs',{booksResult: result.rows});
});};

server.post('/searches',(req,res)=>{
    var searchKey = req.body.bookSearch;
    var searchFilter = req.body.searchType;
    let url;
    if (searchFilter == 'title'){
        url = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}+intitle`;
    }else{
        url = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}+inauthor`;
    }

agent.get(url)
.then(bookData =>{
    let result = bookData.body.items.map(element =>{
        return new Book(element)
    });
    res.render('./pages/searches/show',{booksResult: result });

});
});

server.get('/search/new',(req,res)=>{
    res.render('./pages/searches/new.ejs')
});

server.post('/book',saveBook);
function saveBook(req,res){
    let {bookname,bookauthor,bookdesc,bookimage,bookcat} = req.body;
    console.log(req.body);
let safeValues = [bookname,bookauthor,bookdesc,bookimage,bookcat];
let qery = 'INSERT INTO BOOK_LIST (bookName,bookAuthor,bookDesc,bookImage,bookCat) VALUES($1,$2,$3,$4,$5);';
client.query(qery,safeValues).then(()=>{
    res.redirect('/');
})
};
function Book(data) {
    this.bookName = data.volumeInfo.title,
    this.bookAuthor = ((data.volumeInfo.authors) ? data.volumeInfo.authors[0] : 'unKnown')//data.volumeInfo.authors[0],
    this.bookDesc = data.volumeInfo.description,
    this.bookImage = ((data.volumeInfo.imageLinks) ? data.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg')
};

server.get('/*',(req,res)=>{
    res.render('pages/error.ejs')
});
client.connect().then(()=>{
    server.listen(PORT,() =>{
        console.log(`listening to port : ${PORT}`);
});
});