# Meliran

## npm install -g nodemon

## Run 

nodemon server.js

MeliranWebsite/
├── public/               // Static files (CSS, JS, images)
│   ├── css/
│   │   └── style.css     // Custom styles
│   └── js/
│       └── script.js     // Client-side JS
├── views/                // EJS templates
│   ├── partials/
│   │   └── navbar.ejs    // Reusable navigation
│   ├── home.ejs          // Home page
│   ├── about.ejs
│   ├── contact.ejs
│   ├── events.ejs        // List events
│   ├── event-details.ejs // Event details + RSVP
│   └── articles.ejs      // List articles
├── routes/               // Route handlers
│   ├── index.js          // Main routes (Home, About, etc.)
│   ├── events.js         // Event routes
│   └── articles.js       // Article routes
├── models/               // Database models
│   ├── event.js          // Event model
│   └── article.js        // Article model
├── db.js                 // SQLite connection
├── package.json          // Project config
└── server.js             // Entry point



## powershell API test 
Invoke-WebRequest -Uri "http://localhost:3000/api/events" | Select-Object -ExpandProperty Content

## populate the api
node .\check-db.js  

## building react front end npx create-react-app meliran-frontend

## after the change will be
E:\work\
├── Meliran\             // API (Backend)
│   ├── node_modules/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
├── meliran-frontend\    // UI (Frontend)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...