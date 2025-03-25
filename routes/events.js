const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Later: Fetch events from DB
  const events = [{ id: 1, title: 'Sample Event', date: '2025-04-01' }];
  res.render('events', { events });
});

router.get('/:id', (req, res) => {
  // Later: Fetch event by ID
  const event = { id: req.params.id, title: 'Sample Event', rsvpCount: 5 };
  res.render('event-details', { event });
});

router.post('/:id/rsvp', (req, res) => {
  // Later: Update RSVP in DB
  res.redirect(`/events/${req.params.id}`);
});

module.exports = router;