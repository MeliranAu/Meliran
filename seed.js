const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./meliran.db', (err) => {
  if (err) console.error('Error connecting to SQLite:', err);
  console.log('Connected to SQLite for seeding');
});

db.serialize(() => {
  // Seed events
  db.run("INSERT INTO events (title, date, rsvpCount) VALUES (?, ?, ?)", 
    ["Sample Event", "2025-04-01", 0], 
    (err) => { if (err) console.error('Error seeding events:', err); else console.log('Seeded event'); }
  );

  // Seed articles (optional, for your articles page)
  db.run("INSERT INTO articles (title, content, date) VALUES (?, ?, ?)", 
    ["First Article", "This is a test article.", "2025-03-25"], 
    (err) => { if (err) console.error('Error seeding articles:', err); else console.log('Seeded article'); }
  );

  // Add more data if you want
  db.run("INSERT INTO events (title, date, rsvpCount) VALUES (?, ?, ?)", 
    ["Another Event", "2025-05-01", 0], 
    (err) => { if (err) console.error('Error seeding events:', err); else console.log('Seeded another event'); }
  );
});

// Close the database after seeding
db.close((err) => {
  if (err) console.error('Error closing DB:', err);
  console.log('Database seeding complete, connection closed');
});