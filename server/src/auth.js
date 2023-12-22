const jwt = require('jsonwebtoken');

const values = ['id', 'username', 'password'];

const user = Object.fromEntries(
  Buffer.from('MXxqb2huZG9lfHF3ZXJ0eTEyMw==', 'base64')
    .toString('utf-8')
    .split('|')
    .map((x, y) => [values[y], x]),
);

const encode = (secret) => (username, password) => {
  if (!user || user.password !== password) {
    return false;
  }

  return jwt.sign(
    {
      name: user.username,
    },
    secret,
    {
      issuer: process.env.URI,
      subject: `${user.id}`,
      expiresIn: 30 * 60,
    },
  );
};

const decode = (secret) => (token) => {
  let decoded;
  if (typeof token !== 'string') return false;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    console.error(error.message);
    return false;
  }
  if (decoded.error !== undefined) return false;
  return decoded;
};

module.exports = { encode, decode };
