'use strict';
require('dotenv').config()
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3030;
const agent = require('superagent')
server.use(express.static('./public'));

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.set('view engine','ejs');

server.get('/hello',(req,res)=>{
    res.render('./pages/index.ejs');
});

server.get('/searches/show',(req,res)=>{
res.render('./pages/searches/show.ejs');
});

// server.get('/searches',(req,res)=>{
//     let url = `https://www.googleapis.com/books/v1/volumes?q=dogs`;
//     superagent.get(url)
//     .then (dogsData =>{
//         console.log(dogsData.body.items)
//         res.render('booksData',{dogData: dogsData.body });
//     })
// })
// https://www.googleapis.com/books/v1/volumes?q=search+terms

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
    // console.log(bookData.body.items[0].volumeInfo.authors[0]);

    let result = bookData.body.items.map(element =>{
        return new Book(element)
    });
    // res.status(200).send(bookData.body.items[0]);
    // res.render('books',{booksResult: result})
    res.render('pages/searches/show',{booksResult: result });

})
})

server.get('/search/new',(req,res)=>{
    res.render('pages/searches/new.ejs')
})
// https://i.imgur.com/J5LVHEL.jpg
function Book(data) {
    this.bookName = data.volumeInfo.title,
    this.bookAuthor = ((data.volumeInfo.authors) ? data.volumeInfo.authors[0] : 'unKnown')//data.volumeInfo.authors[0],
    this.bookDesc = data.volumeInfo.description,
    this.bookImage = ((data.volumeInfo.imageLinks.thumbnail) ? data.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg')
}
server.post('/searches',(req,res)=>{

});
server.listen(PORT,() =>{
console.log(`listening to port : ${PORT}`);
});