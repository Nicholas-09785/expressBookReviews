const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  if (username == password)
    return res.status(401).json({message: "Username and passwords should not match"});

  if (!isValid(username))
    return res.status(401).json({message: "No spaces"});

  if (users.includes[username])
    return res.status(401).json({message: "Username taken"});

  users.push({ username: username, password: password });
  res.status(201).json({message: "Completed", username });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  
  // Without promise:
  // return res.status(300).json({message: JSON.stringify(books)});

  // With promise:
  new Promise((resolve, reject) => {
        setTimeout(() => {
            
            resolve({ message: books });
        }, 1000);
    }).then(data => {
      res.json(data);
    }).catch(err => {
      console.error("Data error: ", err);
      res.status(500).json({ error: "Internal error" });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  
  // Without promise:
  /*
  const isbn = req.params.isbn;
  for (const key in books) {
    const num = key;
    if (Math.floor(isbn) == num)
      return res.status(300).json({message: books[key].title});
  }
  return res.status(400).json({message: "Book not found based on isbn"});*/

  // With promise
  new Promise((resolve, reject) => {
        setTimeout(() => {
            const isbn = req.params.isbn;
            for (const key in books) {
              const num = key;
              if (Math.floor(isbn) == num)
                resolve({ message: books[key].title });
            }
            resolve({message: "Book not found based on isbn"});

        }, 1000);
    }).then(data => {
      res.json(data);
    }).catch(err => {
      console.error("Data error: ", err);
      res.status(500).json({ error: "Internal error" });
    });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  // Without promise:
  /*
  const author = req.params.author;
  for (const key in books) {
    const authorPerson = books[key].author;
    if (authorPerson == author)
      return res.status(300).json({message: books[key].title});
  }
  return res.status(401).json({message: "Book not found based off author"});*/

  // With promise
  new Promise((resolve, reject) => {
        setTimeout(() => {
            const author = req.params.author;
            for (const key in books) {
              const authorPerson = books[key].author;
              if (authorPerson == author)
                resolve({message: books[key].title});
            }
            resolve({message: "Book not found based off author"});
        }, 1000);
    }).then(data => {
      res.json(data);
    }).catch(err => {
      console.error("Data error: ", err);
      res.status(500).json({ error: "Internal error" });
    });
});

function getTitle(req, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const title = req.params.title;
      for (const key in books) {
        const bookTitle = books[key].title;
        if (bookTitle == title)
          resolve({message: "Author: " + books[key].author + ", Reviews: " + books[key].reviews + ", ISBN: " + key + ", Title" + books[key].title});
      }
      resolve([]);
    }, 3000);
  });
}

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
  //Write your code here

  // Without async-await:
  /*const title = req.params.title;
  for (const key in books) {
    const bookTitle = books[key].title;
    if (bookTitle == title)
      return res.status(300).json({message: "Author: " + books[key].author + ", Reviews: " + books[key].reviews});
  }
  return res.status(401).json({message: "Book not found based off title"});*/

  // With async-await:
  const title = await getTitle(req, res);
  if (title.length === 0)
    return res.status(401).json({message: "Did not find book title"}); // Message if book title not found
  res.json(title);
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
  return res.status(401).json({message: "Book isbn not found"});
});

module.exports.general = public_users;
