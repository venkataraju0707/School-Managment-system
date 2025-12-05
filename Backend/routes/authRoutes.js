const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const router = express.Router();
// Login
router.post('/login', async (req, res) => {
 try {
 const { username, password } = req.body;
 // Default admin credentials
 if (username === 'admin' && password === 'admin@0707') {
 const adminUser = await User.findOne({ username: 'admin' });
 if (!adminUser) {
 // Create admin user if doesn't exist
 const newAdmin = new User({
 username: 'admin',
 email: 'admin@school.com',
 password: 'admin@0707',
role: 'admin',
 profile: {
 firstName: 'System',
 lastName: 'Administrator'
 }
 });
 await newAdmin.save();
 }
 }
 const user = await User.findOne({
 $or: [{ username }, { email: username }]
 });
 if (!user || !(await user.comparePassword(password))) {
 return res.status(400).json({ message: 'Invalid credentials' });
 }
 if (!user.isActive) {
 return res.status(400).json({ message: 'Account is deactivated' });
 }
 // Update last login
 user.lastLogin = new Date();
 await user.save();
 const token = jwt.sign(
 { userId: user._id, role: user.role },
 process.env.JWT_SECRET,
 { expiresIn: '24h' }
 );
res.json({
 token,
 user: {
 id: user._id,
 username: user.username,
 email: user.email,
 role: user.role,
 profile: user.profile
 }
 });
 } catch (error) {
 res.status(500).json({ message: 'Server error', error: error.message });
 }
})
// Get current user
router.get('/me', auth, async (req, res) => {
 res.json({
 user: {
 id: req.user._id,
 username: req.user.username,
 email: req.user.email,
 role: req.user.role,
 profile: req.user.profile
 }
 });
});
module.exports = router;
