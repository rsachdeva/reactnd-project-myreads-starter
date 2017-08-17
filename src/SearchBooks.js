import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    onUpdateFoundBooksAlreadyInBookShelf: PropTypes.func.isRequired,
    onAdjustBooksBookShelf: PropTypes.func.isRequired
  }

  state = {
    foundBooks: []
  }

  clearFoundBooks = () => {
    this.setState({ foundBooks: [] })
  }

  findBooks = (query) => {
    if (query.length === 0) {
      this.clearFoundBooks()
    } else {
      BooksAPI.search(query).then((foundBooks) => {
        if (foundBooks.error) {
          this.clearFoundBooks()
        } else {
          // the foundBooks have to reflect state on bookshelf as per books alreday in Book shelf
          this.setState({ foundBooks: this.props.onUpdateFoundBooksAlreadyInBookShelf(foundBooks) })
        }
      })
    }
  }

  adjustFoundBooksBookShelf = (bookInTransition, shelf) => {
    this.props.onAdjustBooksBookShelf(bookInTransition, shelf)
    this.setState(state => ({
      foundBooks: state.foundBooks.map((foundBook) => {
        if (foundBook.id === bookInTransition.id) {
          foundBook.shelf = shelf
          return foundBook
        } else {
          return foundBook
        }})
    }))
  }

  render() {
    const { foundBooks } = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}

            <input
              type='text'
              placeholder='Search by title or author'
              onChange={(event) => this.findBooks(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {foundBooks.map((foundBook) => {
              return <li key={foundBook.id}>
                <Book book={foundBook} onAdjustBookShelf={this.adjustFoundBooksBookShelf}/>
              </li>
              }
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks