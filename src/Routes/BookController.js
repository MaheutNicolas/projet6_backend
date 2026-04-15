const BookService = require('../Service/BookService');

module.exports = function(app) {

    app.get('/api/books', function(req, res){
       BookService.getAllBooks();
    });

    app.get('/api/books/:id', function(req, res){
       BookService.getBookById(req.params.id);
    });

    app.post('/api/books', function(req, res){
       let data = req.body;
       BookService.createBook(data);
    });

    app.put('/api/books/:id', function(req, res){
        BookService.putBook(req.params.id, req.body);
    });

    app.delete('/api/books/:id', function(req, res){
        BookService.deleteBook(req.params.id) ;
    });

    app.get('/api/books/bestrating', function(req, res){
       
    });

    app.delete('/api/books/:id/rating', function(req, res){
        
    });
}