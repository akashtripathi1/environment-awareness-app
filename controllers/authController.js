const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const { generateToken } = require('../utilities/jwtUtils')

exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;

  try {


    // Check for existing email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }


    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Create token
    const payload = { user: { id: newUser.id } };
    const token = generateToken(payload);

    // Respond with token and success message
    res.status(201).json({
      message: 'User registered successfully',
      token: token  // Send token back in the response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email does not exists' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Email or password' });
    }

    // Generate a JWT token
    const payload = { user: { id: user.id } };
    const token = generateToken(payload);
    res.status(200).json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUser = async(req,res) => {
  try {

    const userId  = req.user.user.id;
    const user = await User.findById(userId);  // req.user is the userId

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
