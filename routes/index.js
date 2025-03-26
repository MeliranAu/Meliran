const express = require('express');
const router = express.Router();
const db = require('../db'); // If not already included for contact form

router.get('/', (req, res) => res.render('home'));
router.get('/about', (req, res) => res.render('about'));
router.get('/article-charter', (req, res) => res.render('article-charter'));
router.get('/team', (req, res) => res.render('team'));
router.get('/occasions', (req, res) => res.render('occasions'));
router.get('/contact', (req, res) => res.render('contact'));

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const date = new Date().toISOString().split('T')[0];
  db.run('INSERT INTO contacts (name, email, message, date) VALUES (?, ?, ?, ?)', 
    [name, email, message, date], 
    (err) => {
      if (err) return res.status(500).send('Error saving message');
      res.render('contact', { success: true });
    }
  );
});

module.exports = router;