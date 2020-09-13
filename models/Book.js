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



// book.update(req.body)
// .then(res.redirect('/books'))
// .catch(err => {
//     if(err.name === 'SequelizeValidationError') {
//         console.log('this works!!!!');
        
//         if (!title) {
//             errors.push({text: 'Your book needs a title!'})
//             console.log('No title');
//         }
//         if (!author) {
//             errors.push({text: 'Who are you? Please tell us.'})
//             console.log('No Author')
//         }
//         if (!genre) {
//             errors.push({text: 'Have you considered a genre?'})
//             console.log('No genre');
//         }
//         if (!year) {
//             errors.push({text: 'What year was this published?'})
//             console.log('No year');
//         }
//         if (errors.length > 0) {
//             Book.findByPk(id)
//                 .then(book => {
//                     res.render('update-book', {errors, book})
//                 })
//                 .catch(err => console.log(err))
                  
            
//         }
//     }
// })