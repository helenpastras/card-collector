const express = require('express');
const app = express();
const methodOverride = require('method-override'); // new
const morgan = require('morgan'); //new
const path = require('path');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// ____dotenv access
require('dotenv').config()
console.log(process.env)

// _____________db setup_______________
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection
db.on('connected', () => {console.log(`Connected to MongoDB ${mongoose.connection.name}.`);});
db.on('error', (err) => {console.log('Error: ', err)});
db.on('disconnected', () => {console.log('mongo disconnected')})

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));



app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
