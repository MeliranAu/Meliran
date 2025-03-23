// filepath: e:\work\Meliran\controllers\homeController.js
exports.home = (req, res) => {
  res.render('home', { title: 'Home' });
};

exports.events = (req, res) => {
  res.render('events', { title: 'Events' });
};

exports.about = (req, res) => {
  res.render('about', { title: 'About' });
};

exports.contact = (req, res) => {
  res.render('contact', { title: 'Contact' });
};

exports.team = (req, res) => {
  res.render('team', { title: 'Team' });
};