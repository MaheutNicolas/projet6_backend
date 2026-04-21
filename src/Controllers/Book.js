const Book = require('../Model/Book');
const fs = require('fs');

exports.getAllBook = function(req, res){
    Book.find()
        .then(books => res.status(200).json( books ))
        .catch(error => res.status(400).json({ error }));
}

exports.getBookById = function(req, res){
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
}

exports.createBook = (req, res, next) => {
   const object = JSON.parse(req.body.book);
   delete object._id;
   delete object._userId;
   const book = new Book({
       ...object,
       userId: req.auth.userId,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   });
 
   book.save()
   .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
   .catch(error => { res.status(400).json( { error })})
};

exports.updateBook = function(req, res){
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.updateBook = (req, res, next) => {
    const object = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    
    delete object._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...object, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Livre modifié!'}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


exports.deleteBook = function(req, res){
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                        Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
}



exports.getBestRatings = function(req, res){
    
}

exports.postRating =  function(req, res){
    
}