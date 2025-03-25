const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM events', [], (err, events) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching events');
    }
    res.render('events', { events });
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM events WHERE id = ?', [id], (err, event) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching event');
    }
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.render('event-details', { event });
  });
});

router.post('/:id/rsvp', (req, res) => {
  const id = req.params.id;
  db.run('UPDATE events SET rsvpCount = rsvpCount + 1 WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating RSVP');
    }
    res.redirect(`/events/${id}`);
  });
});

module.exports = router;