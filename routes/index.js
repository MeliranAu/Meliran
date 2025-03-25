const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('home'));
router.get('/about', (req, res) => res.render('about'));
router.get('/contact', (req, res) => res.render('contact'));

// Handle contact form submission
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body; // Get form data
  console.log(`Contact Form: ${name}, ${email}, ${message}`); // Log for now
  res.render('contact', { success: true }); // Show success message
});

module.exports = router;