// Require Varibles
const express = require('express');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');

// Database
const db = require('./config/database');

// Test Database
db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log(`Error: ${err}`))

const app = express();

// Set View Engine to Pug
app.set('view engine', 'pug');

// Load Static Files
app.use('/static', express.static(path.join(__dirname, 'public')))

// Process Form Data
app.use(bodyParser.urlencoded({ extended: true }));

// Render Homepage
app.get('/', (req, res) => res.redirect('/books'));

// Book Routes
app.use('/books', require('./routes/books'));

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log(`This page does not exist: ${err.status} ${err.message}`);
    res.render('page-not-found');
})

// Set Port
const PORT = process.env.PORT || 5000;

// Launch Server
app.listen(PORT, console.log(`Server started on port ${PORT}`));