/**
 * Validator générique
 *
 * @param {Array} fields         - Array of rules
 * @param {Object} req           - request Express
 * @returns { boolean, string[]} - Success => boolean, Errors Arrays 
 *
 * Exemple :
 * { name: 'email', type: 'string', required: true }
 * { name: 'year',  type: 'number', required: true, min: 0, max: 2025 }
 * { name: 'grade', type: 'number', required: true, min: 0, max: 5 }
 */

const validate = (fields, req) => {
  const errors = [];
  const body   = req.body;

  for (const field of fields) {
    const { name, type, required, min, max, message } = field;
    const value = body[name];
    const isEmpty = value === undefined || value === null || value === '';

    // Champ requis
    if (required && isEmpty) {
      errors.push(message || `${name} is required`);
      continue; // inutile de vérifier les autres règles si absent
    }

    // Type
    if (type && typeof value !== type) {
      errors.push(message || `${name} must be a ${type}`);
      continue;
    }

    // Min / Max  (string → lenght, number → value)
    if (min !== undefined) {
      const check = type === 'string' ? value.length : value;
      if (check < min) {
        errors.push(message || `${name} must be at least ${min}${type === 'string' ? ' characters' : ''}`);
      }
    }

    if (max !== undefined) {
      const check = type === 'string' ? value.length : value;
      if (check > max) {
        errors.push(message || `${name} must be at most ${max}${type === 'string' ? ' characters' : ''}`);
      }
    }
  }

  return { success : errors.length == 0 ? true : false, errors: errors };
};

module.exports = validate;