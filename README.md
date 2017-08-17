## Functionality

This web app allows managing Books in Shelf using React.

The Main BookShelf Page reflects the Books in the Book Shelf states and also allows to remove the Book from Bookshelf 
including changing the shelf state of the Books.

Search Page allows books to be searched and added. The Search page is the only way to add New Books - from the Search.
Books can be adjusted bookshelf and even removed from the Search Page.

The Search Page reflects the state of the Main Shelf Page.

## Installation

Use npm or yarn.

npm install
yarn start

## Front End Additions

```
+-- src/
 |-- App.js - React Class component that mantains state for books on bookshelf including new additions and removal.
 Used by Search component through function props also to reflect state of books on search page and also adjust from Search page.
 Has React router updates also.
 |-- Books.js - Stateless Functional React Component for Main Page. Uses prop function to update state in App component.
 |-- SearchBooks.js - React Class component that mantains state for Search Page
 |-- Book.js - Book element for both Main Page and Search Page; React Stateless Funcitonal component
 |-- index.js - app starting with React Router controls
```

Uses ES6/ES7 JS Style of code.

## Copyright
Please notify if you are directly using code from here. Thanks.
Copyright © 2009-2017, DRInnovations, LLC (www.drinnovations.us)

