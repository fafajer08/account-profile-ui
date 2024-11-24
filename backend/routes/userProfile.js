// /routes/userProfile.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile, getUserProfile } = require('../controllers/userProfileController');
const authenticate = require('../middleware/auth'); // JWT authentication middleware

// Route to register a new user
router.post('/register', registerUser);

// Route to login user and return JWT token
router.post('/login', loginUser);

// Route to update user profile (authenticated)
router.put('/updateProfile', authenticate, updateUserProfile);

// Route to get user profile (authenticated)
router.get('/profile', authenticate, getUserProfile);

module.exports = router;
