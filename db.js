const sqlite3 = require('sqlite3').verbose();
const db = require('./db');
db.run("INSERT INTO articles (title, content, date) VALUES (?, ?, ?)", 
  ["First Article", "This is a test article.", "2025-03-25"], 
  (err) => { if (err) console.error(err); }
);

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
});

module.exports = db;

