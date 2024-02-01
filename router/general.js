const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.query.username;
  const password =req.query.password;

  if(username && password) {
    if(!isValid(username)){
      users.push({"username": username,"password":password});
      return res.status(200).json({message:"user registered successfully!"});
    }
    else {
      return res.status(403).json({message:"user already exist!"});

    }
  }

  return res.status(403).json({message: "Not valid username and password"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const filtered_books = Object.values(books);
  const isbnBooks = filtered_books.filter((book) => book.isbn === req.params.isbn);
  return res.status(200).send(isbnBooks);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const filtered_books = Object.values(books);
  const isbnBooks = filtered_books.filter((book) => book.author === req.params.author);
  return res.status(200).send(isbnBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const filtered_books = Object.values(books);
  const isbnBooks = filtered_books.filter((book) => book.title === req.params.title);
  return res.status(200).send(isbnBooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const filtered_books = Object.values(books);
  const isbnBooks = filtered_books.filter((book) => book.isbn === req.params.isbn);
  return res.status(200).send(isbnBooks);
});

module.exports.general = public_users;
