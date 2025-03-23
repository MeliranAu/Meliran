// filepath: e:\work\Meliran\app.js
const express = require('express');
const path = require('path');
const homeRoutes = require('./routes/homeRoutes');

const app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});