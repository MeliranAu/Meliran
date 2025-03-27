const express = require('express');
const session = require('express-session');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Added for POST JSON bodies
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'meliran-secret',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

const adminPassword = 'meliran123';
function isAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.redirect('/admin-login');
}

app.get('/admin-login', (req, res) => res.render('admin-login', { error: false }));
app.post('/admin-login', (req, res) => {
  if (req.body.password === adminPassword) {
    req.session.isAdmin = true;
    res.redirect('/events/new');
  } else {
    res.render('admin-login', { error: true });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// API Routes
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events', [], (err, events) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(events);
  });
});

app.get('/api/articles', (req, res) => {
  db.all('SELECT * FROM articles', [], (err, articles) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(articles);
  });
});

app.get('/api/events/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM events WHERE id = ?', [id], (err, event) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  });
});

app.get('/api/articles/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM articles WHERE id = ?', [id], (err, article) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  });
});

app.post('/api/events', isAdmin, (req, res) => {
  const { title, date } = req.body;
  db.run('INSERT INTO events (title, date, rsvpCount) VALUES (?, ?, 0)', [title, date], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ id: this.lastID, title, date, rsvpCount: 0 });
  });
});

app.post('/api/articles', isAdmin, (req, res) => {
  const { title, content, date } = req.body;
  db.run('INSERT INTO articles (title, content, date) VALUES (?, ?, ?)', [title, content, date], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ id: this.lastID, title, content, date });
  });
});

const indexRoutes = require('./routes/index');
const eventRoutes = require('./routes/events');
const articleRoutes = require('./routes/articles');
app.use('/', indexRoutes);
app.use('/events', eventRoutes);
app.use('/articles', articleRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});