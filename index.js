/* There are problems with luxon so I disabled linters it. */
/* eslint-disable max-classes-per-file */

import { DateTime } from './modules/luxon.js';
import BookInfo from './modules/bookinfo.js';
import StoredInfo from './modules/storeinfo.js';
import LocalStorage from './modules/localstorage.js';
import toggleVisbility from './modules/togglevisibility.js';
import clearClasses from './modules/clearclasses.js';

const bookName = document.getElementById('book-name');
const authorName = document.getElementById('author-name');
const formInput = document.querySelector('#new-book');
const bookSection = document.getElementById('book-list');

// Show Books
document.addEventListener('DOMContentLoaded', StoredInfo.displayBooks);

// Submission Form Event - Add Book
formInput.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = bookName.value;
  const author = authorName.value;

  if (title !== '' && author !== '') {
    const book = new BookInfo(title, author);
    StoredInfo.addbookToList(book);
    LocalStorage.addBookStorage(book);
    StoredInfo.clearInputs();
  }
});

bookSection.addEventListener('click', (e) => {
  StoredInfo.removeBook(e.target);
  LocalStorage.removeBookStorage(e.target.previousElementSibling.innerHTML);
});

const allBooksSection = document.getElementById('all-books');
const addNewBookSection = document.getElementById('add-new-book');
const contactSection = document.getElementById('contact');
const listLink = document.getElementById('list-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');

allBooksSection.classList.add('active');
allBooksSection.classList.remove('hide-class');

listLink.addEventListener('click', () => {
  toggleVisbility(allBooksSection);
  clearClasses(addNewBookSection, contactSection);
});

addLink.addEventListener('click', () => {
  toggleVisbility(addNewBookSection);
  clearClasses(allBooksSection, contactSection);
});

contactLink.addEventListener('click', () => {
  toggleVisbility(contactSection);
  clearClasses(allBooksSection, addNewBookSection);
});

const nowDate = DateTime.now();
const dateDiv = document.getElementById('date');
dateDiv.innerHTML = nowDate;
