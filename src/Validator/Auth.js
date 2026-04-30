const EMAIL_REGEX    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.validateAuth = (req, res, next) => {
  const clean = sanitizeAuth(req.body);
  const error = validateAuth(clean);
  if (error) return res.status(400).json({ message: error });
  
  req.body = clean;
  next();
};

function sanitizeAuth(data) {
  return {
    email:    data.email ?? null,
    password: data.password ?? null
  };
}

function validateAuth(data) {
  const { email, password } = data;

  if (!email || !password) {
    const missing = ['email', 'password'].filter(f => !data[f]);
    return `Champs manquants : ${missing.join(', ')}`;
  }

  if (!EMAIL_REGEX.test(email)) {
    return 'Email invalide';
  }

  return null;
}