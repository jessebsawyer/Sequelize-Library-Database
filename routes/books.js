const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Book = require('../models/Book');

// Show All Books
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

// Render New Book Form
router.get('/new', (req, res) => res.render('new-book'))

// Render Update Book
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Book.findByPk(id)
        .then(book => {
            res.render('update-book', {
                book
            });
        })
        .catch(err => console.log(err))
})

// Update Book
router.post('/:id', (req, res) => {
    let id = req.params.id;
    Book.findByPk(id)
        .then(book => {
            book.update()
                .then(res.redirect('/books'))
        })
        .catch(err => console.log(err))
})      

module.exports = router;