import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));

    fetch('http://localhost:3001/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  return (
    <div className="App">
      <h1>Meliran</h1>
      <section>
        <h2>Events</h2>
        <ul>
          {events.map(event => (
            <li key={event.id}>
              {event.title} - {event.date} (RSVP: {event.rsvpCount})
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Articles</h2>
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              {article.title} - {article.date}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;