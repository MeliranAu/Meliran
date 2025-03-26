const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./meliran.db');
db.all('SELECT * FROM articles', [], (err, rows) => console.log(rows));
db.all('SELECT * FROM events', [], (err, rows) => console.log(rows));
db.close();