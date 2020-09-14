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
        res.render('error')
    })
);

// Render New Book Form
router.get('/new', (req, res) => res.render('new-book'))

// Create New Book
router.post('/new', async (req, res) => {
    let book;
    let {title, author, genre, year} = req.body
    try {
      book = await Book.create(req.body);
      res.redirect('/books');
    } catch (error) {
      if(error.name === "SequelizeValidationError") { // checking the error
        book = await Book.build(req.body);
        res.render('new-book', { book, errors: error.errors, title, author, genre, year})
      } else {
        throw error; // error caught in the asyncHandler's catch block
      }  
    }
  });

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
                res.render('error');
            }
        })
        .catch(err => console.log(err))
})

// Update Book
router.post('/:id', async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if(book) {
        await book.update(req.body);
        res.redirect('/books'); 
      } else {
        res.render('error');
      }
    } catch (error) {
      if(error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id; // make sure correct book gets updated
        res.render('update-book', { book, errors: error.errors})
      } else {
        throw error;
      }
    }
  });

// Delete Book
router.post('/:id/delete', (req, res) => {
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
        .catch(err => {
            if (err) {
                res.render('error')
            }
        })
})

module.exports = router;