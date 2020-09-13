// Require Varibles
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Book = require('../models/Book');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Show All Books
router.get('/', (req, res) => 
Book.findAll()
    .then(book => {
        res.render('index', {
            book
        });
    })
    .catch(err => {
        res.render('error');
    })
);

// Render New Book Form
router.get('/new', (req, res) => res.render('new-book'))

// Create New Book
router.post('/new', (req, res) => {
    let {title, author, genre, year} = req.body
    let errors = [];

    if (!title) {
        errors.push({text: 'Your book needs a title!'})
    }
    if (!author) {
        errors.push({text: 'Who are you? Please tell us.'})
    }
    if (!genre) {
        errors.push({text: 'Have you considered a genre?'})
    }
    if (!year) {
        errors.push({text: 'What year was this published?'})
    }

    if (errors.length > 0) {
        res.render('new-book', {
            errors,
            title,
            author,
            genre,
            year
        });
    } else {
        Book.create(req.body)
        .then(res.redirect('/books'))
        .catch(res.render('error')) 
    }
})      

// Render Update Book
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Book.findByPk(id)
        .then(book => {
            if (book) {
                res.render('update-book', {
                    book
                });
            } else {
                res.render('page-not-found');
            }
        })
        .catch(res.render('error'))
})

// Update Book
router.post('/:id', (req, res) => {
    let id = req.params.id;
    let {title, author, genre, year} = req.body;
    let errors = [];
    Book.findByPk(id)
        .then(book => {
            if (book) {
                if (!title) {
                    errors.push({text: 'Your book needs a title!'})
                }
                if (!author) {
                    errors.push({text: 'Who are you? Please tell us.'})
                }
                if (!genre) {
                    errors.push({text: 'Have you considered a genre?'})
                }
                if (!year) {
                    errors.push({text: 'What year was this published?'})
                }
            
                if (errors.length > 0) {
                    res.render('update-book', {
                        errors,
                        book,
                        title,
                        author,
                        genre,
                        year
                    });
                } else {
                    book.update(req.body)
                    .then(res.redirect('/books'))
                    .catch(err => console.log(err)) 
                }
            } else {
                res.render('page-not-found');
            }
        })
        .catch(res.render('error'))
})      

// Delete Book
router.post('/:id/delete', (req, res) => {
    let id = req.params.id;
    Book.findByPk(id)
        .then(book => {
           if (book) {
            book.destroy(req.body)
            .then(res.redirect('/books'))
           } else {
               res.render('page-not-found');
           }
        })
        .catch(res.render('error'))
})

module.exports = router;