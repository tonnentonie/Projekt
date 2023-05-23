const jwt = require('jsonwebtoken')
const jwtSecret = 'oqawegfhnobp9878OF/76ff'

function sign(payload) {
  return jwt.sign(payload, jwtSecret);

}

function verify(req, res, next) {
  const token = req.headers['api_key'];

  if (!token) {
    return res.status(403).json({ message: 'Kein Token vorhanden.' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Ungültiger Token.' });
    }

    req.userId = decoded.userId;
    next();
  });
}


function verifyTest(apiKey, res) {

  if (!apiKey) {
    console.log('Kein APIKey vorhanden.');
    return res.status(403).json({ message: 'Kein APIKey vorhanden.' });
  }

  resVerified = jwt.verify(apiKey, jwtSecret, (err, decoded) => {
    if (err) {
      console.log('Ungültiger Token.');
      return res.status(401).json({ message: 'Ungültiger APIKey.' });
    }
  });
  console.log(JSON.stringify(resVerified));
}


module.exports =  {
  verify,
  verifyTest,
  sign
};
