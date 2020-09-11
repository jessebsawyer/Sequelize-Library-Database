const Sequelize = require('sequelize');
const db = require('../config/database');

const Book = db.define('book', {
    title: {
        type: Sequelize.STRING, 
        validate: {
            notEmpty: {
                msg: 'Title is required'
            }
        }
    },
    author: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: 'Author is required'
            }
        }
    },
    genre: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: 'Genre is required'
            }
        }
    },
    year: {
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: {
                msg: 'Year is required'
            }
        }
    }
});

module.exports = Book;



