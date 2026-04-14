// src/services/book.service.js
const Book = require('../models/Book');

const getAllBooks = async () => {
  return Book.find();
};

const getBookById = async (id) => {
  return Book.findById(id);
};

const createBook = async (data) => {
  const book = new Book(data);
  await book.save();
  return book;
};

module.exports = { getAllBooks, getBookById, createBook };