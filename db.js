const sqlite3 = require('sqlite3').verbose();

// Create the database connection
const db = new sqlite3.Database('./meliran.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err);
  } else {
    console.log('Connected to SQLite');
  }
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    rsvpCount INTEGER DEFAULT 0
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    date TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    date TEXT
  )`);
});

module.exports = db;