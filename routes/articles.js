const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the SQLite DB connection

router.get('/', (req, res) => {
  // Fetch articles from SQLite
  db.all('SELECT * FROM articles', [], (err, articles) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching articles');
    }
    res.render('articles', { articles });
  });
});

module.exports = router;