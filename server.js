const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parses form data
app.set('view engine', 'ejs');

const indexRoutes = require('./routes/index');
const eventRoutes = require('./routes/events');
const articleRoutes = require('./routes/articles');
app.use('/', indexRoutes);
app.use('/events', eventRoutes);
app.use('/articles', articleRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});