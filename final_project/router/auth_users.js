const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const JWT_SECRET = 'access';

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  return !username.includes(' ');
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  for (const key in users) {
    if (users[key].username == username && users[key].password == password)
      return true;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here

  const { username, password } = req.body;

  // authenticate user from above method
  const authenticate = authenticatedUser(username, password);

  if (!authenticate)
    return res.status(300).json({message: "No username found"});

  const payload = { username: username };

  const accessToken = jwt.sign(payload, JWT_SECRET);

  req.session.authorization = {accessToken: accessToken, username: username};
  
  res.json({ message: 'Login successful', accessToken });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const review = req.query.review;
  const isbn = req.params.isbn;

  for (const key in books) {
    const num = key;
    if (Math.floor(isbn) == num) {
      books[key].reviews[req.username] = review;
      return res.status(200).json({message: "Successfully inserted review"});
    }
  }

  return res.status(404).json({message: "ISBN not found"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;
  
  for (const key in books) {
    const num = key;
    if (Math.floor(isbn) == num) {
      delete books[key].reviews[req.username];
      return res.status(200).json({message: "Successfully deleted review"});
    }
  }

  return res.status(404).json({message: "ISBN not found"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
