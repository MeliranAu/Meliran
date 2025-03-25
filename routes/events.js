const express = require('express');
const router = express.Router();
const db = require('../db');

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) return next();
  res.redirect('/admin-login');
};

router.get('/', (req, res) => {
  db.all('SELECT * FROM events', [], (err, events) => {
    if (err) return res.status(500).send('Error fetching events');
    res.render('events', { events });
  });
});

// Move /new routes before /:id
router.get('/new', isAdmin, (req, res) => res.render('new-event'));
router.post('/new', isAdmin, (req, res) => {
  const { title, date } = req.body;
  db.run('INSERT INTO events (title, date, rsvpCount) VALUES (?, ?, 0)', [title, date], (err) => {
    if (err) return res.status(500).send('Error saving event');
    res.redirect('/events');
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM events WHERE id = ?', [id], (err, event) => {
    if (err) return res.status(500).send('Error fetching event');
    if (!event) return res.status(404).send('Event not found');
    res.render('event-details', { event });
  });
});

router.post('/:id/rsvp', (req, res) => {
  const id = req.params.id;
  db.run('UPDATE events SET rsvpCount = rsvpCount + 1 WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Error updating RSVP');
    res.redirect(`/events/${id}`);
  });
});

module.exports = router;