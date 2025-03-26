const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'meliran-secret',
  resave: false,
  saveUninitialized: false
}));

// Middleware to pass session to all views
app.use((req, res, next) => {
  res.locals.session = req.session; // Make session available in all templates
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

const indexRoutes = require('./routes/index');
const eventRoutes = require('./routes/events');
const articleRoutes = require('./routes/articles');
app.use('/', indexRoutes);
app.use('/events', eventRoutes);
app.use('/articles', articleRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});