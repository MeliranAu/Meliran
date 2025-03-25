const express = require('express');
const session = require('express-session'); // Added for sessions
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({                  // Added session middleware
  secret: 'meliran-secret',        // Unique secret for session encryption
  resave: false,
  saveUninitialized: false
}));

// Admin middleware
const adminPassword = 'meliran123'; // Hardcoded password (change this later)
function isAdmin(req, res, next) {  // Middleware to check admin status
  if (req.session.isAdmin) {
    return next();
  }
  res.redirect('/admin-login');
}

// Admin login routes
app.get('/admin-login', (req, res) => res.render('admin-login', { error: false }));
app.post('/admin-login', (req, res) => {
  if (req.body.password === adminPassword) {
    req.session.isAdmin = true;     // Set session flag for admin
    res.redirect('/events/new');
  } else {
    res.render('admin-login', { error: true });
  }
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