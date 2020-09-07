const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Book = require('../models/Book');

router.get('/', (req, res) => 
Book.findAll()
    .then(book => {
        console.log(book)
        res.render('index', {
            book
        });
    })
    .catch(err => console.log(err))
);

module.exports = router;