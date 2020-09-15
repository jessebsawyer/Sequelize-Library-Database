// Require Varibles
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Book = require('../models/Book');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Show All Books
router.get('/', (req, res, next) => 
Book.findAll()
    .then(book => {
        res.render('index', {
            book
        });
    })
    .catch(err => next(err))
);

// Render New Book Form
router.get('/new', (req, res) => res.render('new-book'))

// Create New Book
router.post('/new', async (req, res, next) => {
    let book;
    let {title, author, genre, year} = req.body
    try {
      book = await Book.create(req.body);
      res.redirect('/books');
    } catch (error) {
      if(error.name === "SequelizeValidationError") { 
        book = await Book.build(req.body);
        res.render('new-book', { book, errors: error.errors, title, author, genre, year})
      } else {
        next(err);
      }  
    }
  });

// Render Update Book
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Book.findByPk(id)
        .then(book => {
          res.render('update-book', {
            book
          });
        })
        .catch(err => next(err));
})

// Update Book
router.post('/:id', async (req, res, next) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      await book.update(req.body);
      res.redirect('/books'); 
    }catch (error) {
      if(error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render('update-book', { book, errors: error.errors})
      } else {
        next(err);
      }
    }
});

// Delete Book
router.post('/:id/delete', (req, res, next) => {
    let id = req.params.id;
    Book.findByPk(id)
        .then(book => {
           if (book) {
            book.destroy(req.body)
            .then(res.redirect('/books'))
           } else {
               res.render('error');
           }
        })
        .catch(err => next(err));
})

module.exports = router;