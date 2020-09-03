const express = require('express');
const pug = require('pug');
const path = require('path');

// Database
const db = require('./config/database');

// Test Database
db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log(`Error: ${err}`))

const app = express();

// Set View Engine to Pug
app.set('view engine', 'pug');

// Render Homepage
app.get('/', (req, res) => res.render('index'));

// Book Routes
app.use('/books', require('./routes/books'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));