import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books'
import SearchBooks from './SearchBooks'

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  findInBookShelf = (books, bookToFind) => (books.find((book) => (book.id === bookToFind.id)))

  adjustBooksBookShelf = (bookInTransition, shelf) => {
    BooksAPI.update(bookInTransition, shelf).then(_ => {
      this.setState(state => {
          let books = state.books
          const bookInBookShelf = this.findInBookShelf(this.state.books, bookInTransition)
          if (bookInBookShelf) {
            if (shelf !== 'none') {
              books = books.map((book) => {
                if (book.id === bookInBookShelf.id)
                  book.shelf = shelf
                return book
              })
            } else {
              books = books.filter((book) => book.id !== bookInTransition.id)
            }
          } else {
            if (shelf !== 'none')
              books = books.concat([bookInTransition])
          }
          return { books: books }
        }
      )
    })
  }

  updateFoundBooksAlreadyInBookShelf = (foundBooks) => {
    return foundBooks.map((foundBook) => {
      const foundBookInBookShelf = this.findInBookShelf(this.state.books, foundBook)
      if (foundBookInBookShelf) {
        foundBook.shelf = foundBookInBookShelf.shelf
      }
      return foundBook
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Books books={this.state.books} onAdjustBooksBookShelf={this.adjustBooksBookShelf}/>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks onUpdateFoundBooksAlreadyInBookShelf={this.updateFoundBooksAlreadyInBookShelf} onAdjustBooksBookShelf={this.adjustBooksBookShelf}/>
        )}/>
      </div>
    )
  }
}

export default App
