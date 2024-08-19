const express = require('express');
const multer = require('multer');
const { User, Profile, SecondaryContact, Rating, Friend, Chat } = require('./models');
const router = express.Router();

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Basic Registration (First Tier)
router.post('/register/basic', upload.fields([{ name: 'profilePhoto' }, { name: 'idPhoto' }]), async (req, res) => {
  try {
    const { email, password, role, firstName, lastName, dateOfBirth, idNumber, phoneNumber, location } = req.body;

    const user = await User.create({ email, password, role });
    const profile = await Profile.create({ 
      userId: user.id, 
      firstName, 
      lastName, 
      dateOfBirth, 
      idNumber, 
      phoneNumber, 
      location, 
      profilePhoto: req.files['profilePhoto'] ? req.files['profilePhoto'][0].path : null,
      idPhoto: req.files['idPhoto'] ? req.files['idPhoto'][0].path : null
    });

    res.status(201).json({ user, profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Secondary Registration (Second Tier)
router.post('/register/secondary', async (req, res) => {
  try {
    const { userId, firstName, lastName, phoneNumber, email, relationship } = req.body;

    const secondaryContact = await SecondaryContact.create({ userId, firstName, lastName, phoneNumber, email, relationship });

    res.status(201).json(secondaryContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Normally you'd generate and return a JWT token here
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rating System: POST /rate
router.post('/rate', async (req, res) => {
  try {
    const { userId, raterId, rating, comments } = req.body;

    // Ensure rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const newRating = await Rating.create({ userId, raterId, rating, comments });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rating System: GET /ratings/:userId
router.get('/ratings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const ratings = await Rating.findAll({ where: { userId } });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Friends System: POST /friends/request
router.post('/friends/request', async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    
    const existingRequest = await Friend.findOne({ where: { userId, friendId } });
    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    const newFriendRequest = await Friend.create({ userId, friendId, status: 'pending' });
    res.status(201).json(newFriendRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Friends System: POST /friends/accept
router.post('/friends/accept', async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const friendRequest = await Friend.findOne({ where: { userId: friendId, friendId: userId, status: 'pending' } });
    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();

    // Optionally create a reverse relationship
    await Friend.create({ userId, friendId, status: 'accepted' });

    res.status(200).json(friendRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Friends System: GET /friends/:userId
router.get('/friends/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const friends = await Friend.findAll({ where: { userId, status: 'accepted' } });
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
