const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const emailService = require('../services/emailService');


const generateAuthToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const authController = {
  register: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        age,
        location,
        gender,
        role,
      } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        age,
        location,
        gender,
        role,
      });

      await user.save();

      
      await emailService.sendWelcomeEmail(user.email);

      const token = generateAuthToken(user);

      res.status(201).json({
        token,
        userId: user._id,
        role: user.role,
        message: 'User registered successfully. Welcome email sent.',
      });
    } catch (error) {
      console.error('Registration failed:', error);
      res.status(500).json({ message: `Registration failed. ${error.message}` });
    }
  },

  login: async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    req.user = user;

    const token = generateAuthToken(user);

    res.json({ token, userId: user._id, role: user.role, message: 'Login successful.' });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
},

};

module.exports = authController;
