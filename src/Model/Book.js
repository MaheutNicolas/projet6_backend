const mongoose = require('mongoose');

// ─── Sous-schéma : une note ────────────────────────────────────────────────

const ratingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    grade:  { type: Number, required: true, min: 0, max: 5 },
  },
  { _id: false } // pas d'_id généré pour chaque note
);

// ─── Schéma principal : Book ───────────────────────────────────────────────

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type:     String,
      required: [true, 'userId is required'],
    },
    title: {
      type:     String,
      required: [true, 'title is required'],
      trim:     true,
    },
    author: {
      type:     String,
      required: [true, 'author is required'],
      trim:     true,
    },
    imageUrl: {
      type:     String,
      required: [true, 'imageUrl is required'],
    },
    year: {
      type:     Number,
      required: [true, 'year is required'],
    },
    genre: {
      type:     String,
      required: [true, 'genre is required'],
      trim:     true,
    },
    ratings: {
      type:    [ratingSchema],
      default: [],
    },
    averageRating: {
      type:    Number,
      default: 0,
      min:     0,
      max:     5,
    },
  },
  {
    timestamps: true, // ajoute createdAt et updatedAt automatiquement
  }
);

// ─── Méthode : recalcule et sauvegarde averageRating ──────────────────────

bookSchema.methods.updateAverageRating = function () {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
    return;
  }

  const total = this.ratings.reduce((sum, r) => sum + r.grade, 0);
  this.averageRating = Math.round((total / this.ratings.length) * 10) / 10;
};

// ─── Méthode : ajouter ou mettre à jour la note d'un utilisateur ──────────

bookSchema.methods.addOrUpdateRating = function (userId, grade) {
  const existing = this.ratings.find((r) => r.userId === userId);

  if (existing) {
    existing.grade = grade; // l'utilisateur met à jour sa note
  } else {
    this.ratings.push({ userId, grade }); // nouvelle note
  }

  this.updateAverageRating();
};


// ─── Export ───────────────────────────────────────────────────────────────

module.exports = mongoose.model('Book', bookSchema);