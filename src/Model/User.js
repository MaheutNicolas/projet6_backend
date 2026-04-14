const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const SALT_ROUNDS = 10;

// ─── Schéma ───────────────────────────────────────────────────────────────

const userSchema = new mongoose.Schema(
  {
    email: {
      type:     String,
      required: [true, 'email is required'],
      unique:   true,
      trim:     true,
      lowercase: true,
    },
    password: {
      type:     String,
      required: [true, 'password is required'],
    },
  },
  {
    timestamps: true, // createdAt + updatedAt automatiques
  }
);

// ─── Hook : hash du mot de passe avant sauvegarde ─────────────────────────

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

// ─── Méthode : vérifier le mot de passe ───────────────────────────────────

userSchema.methods.verifyPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// ─── Export ───────────────────────────────────────────────────────────────

module.exports = mongoose.model('User', userSchema);