const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Middleware specific to this route
router.use((req, res, next) => {
  console.log('User route middleware');
  next();
});

// Get all users (protected route)
router.get('/', authenticateToken, (req, res) => {
  res.json({ 
    users: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ],
    authenticatedUser: req.user
  });
});

// Get user by ID (protected route)
router.get('/:id', authenticateToken, (req, res) => {
  res.json({ 
    id: req.params.id, 
    name: 'John Doe',
    authenticatedUser: req.user
  });
});

// Create new user (protected route)
router.post('/', authenticateToken, (req, res) => {
  const { name } = req.body;
  res.status(201).json({ 
    id: 3, 
    name,
    createdBy: req.user.username
  });
});

// Update user (protected route)
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  res.json({ 
    id, 
    name,
    updatedBy: req.user.username
  });
});

// Delete user (protected route)
router.delete('/:id', authenticateToken, (req, res) => {
  res.status(204).end();
});

module.exports = router;