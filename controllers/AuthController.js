const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    
  const { name, email, password, active, user_id } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let query = 'INSERT INTO users (name, email, password, active, user_id) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [name, email, hashedPassword, active, user_id]);

    res.status(201).send('User registered');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [rows] = await db.query('SELECT password FROM users WHERE email = ? and active = 1', [email]);
    if (rows.length === 0) return res.status(400).send('Invalid credentials');
    
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send('Invalid credentials');
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};
