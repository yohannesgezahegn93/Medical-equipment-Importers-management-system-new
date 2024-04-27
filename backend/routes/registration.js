const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = '123456789';

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// ZeroBounce API Configuration
const ZEROBOUNCE_API_KEY = '3c35efe1eb1945e0aaf97d29f94d08f1';
const ZEROBOUNCE_API_URL = 'https://api.zerobounce.net/v2/validate';

// Function to validate email using ZeroBounce API
const validateEmail = async (email) => {
  try {
    const response = await axios.get(`${ZEROBOUNCE_API_URL}?api_key=${ZEROBOUNCE_API_KEY}&email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error validating email:', error);
    throw error;
  }
};

// POST create a new user with image upload
router.post('/', upload.single('profilePicture'), async (req, res) => {
  const { name, lastName, userName, phoneNumber, email, password, occupation} = req.body;
  const profilePicture = req.file ? req.file.path : null; // Store image path if uploaded, otherwise null

  try {
    // Validate email using ZeroBounce API
   // const validationResponse = await validateEmail(email);
   //console.log('hello world',validationResponse.status);
   // if (validationResponse.status === 'valid') {
      // If email is valid, proceed with user creation
      const newUser = await User.create({ name, lastName, userName, phoneNumber, email, password, occupation, profilePicture });
      res.json(newUser);
    //} else {
      // If email is invalid, return an error response
     // res.status(400).json({ error: 'Invalid email address' });
    //}
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update user profile with image upload
router.put('/:userId/profile', upload.single('profilePicture'), async (req, res) => {
  const { userId } = req.params;
  const profilePicture = req.file ? req.file.path : null; // Store image path if uploaded, otherwise null

  try {
    // Find the user by ID
    let user = await User.findByPk(userId); // Change this line

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update the profile picture
    user.profilePicture = profilePicture;
    await user.save();
    console.log(user);
    res.json({ msg: 'Profile picture updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// GET all users

////////////////////////

////////////////////////

// GET user by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/login', async (req, res) => {
  const { userName, email, password } = req.body;

  try {
      // Find the user by emai
      const Logger = await User.findOne({where: {email:email, userName:userName} });

      if (Logger) {
          // Compare the provided password with the hashed password stored in the database
          const passwordMatch = await bcrypt.compare(password, Logger.password);
          
          if (passwordMatch) {
              // If passwords match, generate JWT token
              const token = jwt.sign({ 
                  id:Logger.id,
                  name: Logger.name,
                  userName: Logger.userName,
                  lastName: Logger.lastName,
                  email: Logger.email,
                  occupation: Logger.occupation,
                  profilePicture: Logger.profilePicture,
              }, secretKey, { expiresIn: '24h' });
              console.log('token-backend', token);
              res.json({ success: true, token });
           
          } else {
              // If passwords don't match, send invalid credentials response
              res.status(401).json({ success: false, message: 'Invalid credentials' });
          }
      } else {
          // If user with the provided email doesn't exist, send invalid credentials response
          res.status(401).json({ success: false, message: 'Invalid ' });
      
      }
  } catch (error) {
      console.error(error, 'Error on backend');
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



module.exports = router;
