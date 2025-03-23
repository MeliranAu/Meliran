// filepath: e:\work\Meliran\routes\homeRoutes.js
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.get('/events', homeController.events);
router.get('/about', homeController.about);
router.get('/contact', homeController.contact);
router.get('/team', homeController.team);

module.exports = router;