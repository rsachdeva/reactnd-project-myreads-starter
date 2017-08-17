import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {

    const { book, onAdjustBookShelf } = props

    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})`
          }}></div>}
          <div className="book-shelf-changer">
            <select value={book.shelf || "none"} onChange={(event) => {
              if (onAdjustBookShelf) {
                onAdjustBookShelf(book, event.target.value)
              }
            }}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && <div className="book-authors">{book.authors.join(', ')}</div>}
      </div>
    )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onAdjustBookShelf: PropTypes.func.isRequired
}

export default Book