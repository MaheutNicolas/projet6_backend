// src/services/book.service.js
const Book = require('../Models/Book');

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

const putBook = async (id, data) => {
	Book.replaceOne(({ _id: id }, data))
};

const deleteBook = async (id) => {
	Book.deleteOne(id).exect()
};

module.exports = { getAllBooks, getBookById, createBook, putBook, deleteBook };