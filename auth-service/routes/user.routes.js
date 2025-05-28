const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Token valide',
    user: req.user
  });
});

module.exports = router;
