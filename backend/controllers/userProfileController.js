// /controllers/userProfileController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userProfile = require('../models/userProfile');

// Register a new user
const registerUser = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await userProfile.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user profile
    const newUser = new userProfile({
      username,
      password,
      firstName,
      lastName,
      email,
    });

    // Save the new user
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user and return JWT token
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const userProfile = await userProfile.findOne({ username });

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, userProfile.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: userProfile._id, username: userProfile.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Send the token in the response
    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { userId } = req.user; // Get userId from the authenticated user (via JWT)
  const { firstName, lastName, email, phoneNumber, mobileNumber, twoFA, vacationMode } = req.body;

  try {
    // Find user by ID and update profile fields
    const updatedUser = await UserProfile.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        mobileNumber,
        twoFA,
        vacationMode,
      },
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  const { userId } = req.user; // Get userId from the authenticated user (via JWT)

  try {
    const userProfile = await UserProfile.findById(userId).select('-password'); // Exclude password from profile
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: userProfile });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, updateUserProfile, getUserProfile };
