import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

const Books = (props) => {

  const {books, onAdjustBooksBookShelf} = props
  const bookShelvesWithTitle =
    [['currentlyReading', 'Currently Reading'],
      ['wantToRead', 'Want to Read'],
      ['read', 'Read']]

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelvesWithTitle.map(bookShelfWithTitle => {
            const [ shelf, title ] = bookShelfWithTitle
            return <div key={shelf} className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter((book) => book.shelf === shelf).map((book) => (
                    <li key={book.id}>
                      <Book book={book} onAdjustBookShelf={onAdjustBooksBookShelf}/>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a Book</Link>
      </div>
    </div>
  )
}

Books.propTypes = {
  books: PropTypes.array.isRequired,
  onAdjustBooksBookShelf: PropTypes.func.isRequired
}

export default Books