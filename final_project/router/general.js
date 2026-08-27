const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  if (username == password)
    return res.status(300).json({message: "Username and passwords should not match"});

  if (!isValid(username))
    return res.status(300).json({message: "No spaces"});

  if (users.includes[username])
    return res.status(300).json({message: "Username taken"});

  users.push({ username: username, password: password });
  res.status(201).json({message: "Completed", username });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message: JSON.stringify(books)});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  for (const key in books) {
    const num = key;
    if (Math.floor(isbn) == num)
      return res.status(300).json({message: books[key].title});
  }
  return res.status(300).json({message: isbn});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  for (const key in books) {
    const authorPerson = books[key].author;
    if (authorPerson == author)
      return res.status(300).json({message: books[key].title});
  }
  return res.status(404).json({message: "Book not found based off author"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  for (const key in books) {
    const bookTitle = books[key].title;
    if (bookTitle == title)
      return res.status(300).json({message: "Author: " + books[key].author + ", Reviews: " + books[key].reviews});
  }
  return res.status(404).json({message: "Book not found based off title"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  for (const key in books) {
    const num = key;
    if (Math.floor(isbn) == num)
      return res.status(300).json({message: books[key].review});
  }
  return res.status(300).json({message: JSON.stringify(review)});
});

module.exports.general = public_users;
