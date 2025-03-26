const express = require('express');
const router = express.Router();
const db = require('../db');

// Admin middleware (same as in events.js)
const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) return next();
  res.redirect('/admin-login');
};

router.get('/', (req, res) => {
  db.all('SELECT * FROM articles', [], (err, articles) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching articles');
    }
    res.render('articles', { articles });
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM articles WHERE id = ?', [id], (err, article) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching article');
    }
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.render('article-details', { article });
  });
});

// New routes for article creation
router.get('/new', isAdmin, (req, res) => {
  res.render('new-article');
});

router.post('/new', isAdmin, (req, res) => {
  const { title, content } = req.body;
  const date = new Date().toISOString().split('T')[0]; // Current date
  db.run('INSERT INTO articles (title, content, date) VALUES (?, ?, ?)', [title, content, date], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving article');
    }
    res.redirect('/articles');
  });
});

module.exports = router;