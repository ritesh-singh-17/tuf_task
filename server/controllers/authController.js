const db = require("../config/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';

  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).send('Server error.');

    if (results.length === 0) {
      return res.status(400).send('Invalid username or password.');
    }

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send('Invalid username or password.');
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });

    res.send({ token });
  });
};

module.exports = { login };
