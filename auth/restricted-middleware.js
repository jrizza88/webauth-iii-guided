const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const { jwtSecret } = require('../config/secrets');

module.exports = (req, res, next) => {
// check for a valid web token
// make sure the user is authorized to see this endpoint
const token = req.headers.authorization;

if (token) {
  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ err: 'user not verified'})
    } else {
      console.log('token confirmed', decodedToken)
      req.decodedJwt = decodedToken;
      next();
    }
  });
} else {
  res.status(401).json({ err: 'user not verified'});
}
};


// module.exports = (req, res, next) => {
//   const { username, password } = req.headers;

//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: 'Invalid Credentials' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: 'Ran into an unexpected error' });
//       });
//   } else {
//     res.status(400).json({ message: 'No credentials provided' });
//   }
// };