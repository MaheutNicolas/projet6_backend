// Middleware création (multipart)
exports.validateCreateBook = (req, res, next) => {
  if (!req.file) {  return res.status(400).json({ message: 'Image obligatoire' }); }
  const parsed = JSON.parse(req.body.book);

  if (!parsed.ratings) return res.status(400).json({ message: 'Note obligatoire' });
  const ratings = sanitizeRatings(parsed.ratings, req.auth.userId)
  let error = validateRatingNumber(ratings[0].grade);
  if (error) return res.status(400).json({ message: error });

  const clean  = sanitizeBook(parsed);
  error  = validateBook(clean);
  if (error) return res.status(400).json({ message: error });

  clean.ratings = ratings;
  req.body = clean;
  next();
};

// Middleware mise à jour
exports.validateUpdateBook = (req, res, next) => {
  const parsed = req.file ? JSON.parse(req.body.book) : req.body;
  const clean  = sanitizeBook(parsed);
  const error  = validateBook(clean);
  if (error) return res.status(400).json({ message: error });

  req.body = clean;
  next();
};

// Middleware notation unique
exports.validateRating = (req, res, next) => {
  const { rating } = req.body;

  let error = validateRatingNumber(rating);
  if (error) return res.status(400).json({ message: error });

  req.body.userId = req.auth.userId;
  next();
};

function sanitizeBook(data) {
  return {
    title:  data.title,
    author: data.author,
    year:   Number(data.year),
    genre:  data.genre
  };
}

function validateBook(data) {
  const { title, author, year, genre } = data;

  if (!title || !author || !year || !genre) {
    const missing = ['title', 'author', 'year', 'genre'].filter(f => !data[f]);
    return `Champs manquants : ${missing.join(', ')}`;
  }
  if (typeof title !== 'string' || typeof author !== 'string' || typeof genre !== 'string') {
    return 'title, author et genre doivent être des chaînes de caractères';
  }
  if (isNaN(year)) {
    return '"year" doit être un nombre';
  }

  return null;
}


function sanitizeRatings(ratings, authUserId) {
  const first = ratings[0];
  return [{
    userId: authUserId,
    grade:  Number(first.grade) ?? 0,
  }];
}

function validateRatingNumber( rating ) {
  if (rating === undefined) {
    return  'rating est obligatoire';
  }
  if (rating < 0 || rating > 5) {
    return 'rating doit être entre 0 et 5';
  }

  return null;
}