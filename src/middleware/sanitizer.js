import sanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

export const sanitizer = [
  // Prevent NoSQL injection
  sanitize(),
  
  // Prevent XSS attacks
  xss(),
  
  // Custom sanitization
  (req, res, next) => {
    if (req.body) {
      // Remove any keys starting with '$' (MongoDB operators)
      const sanitizeObj = (obj) => {
        Object.keys(obj).forEach(key => {
          if (key[0] === '$') {
            delete obj[key];
          } else if (typeof obj[key] === 'object') {
            sanitizeObj(obj[key]);
          }
        });
      };
      sanitizeObj(req.body);
    }
    next();
  }
];