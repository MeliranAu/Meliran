import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams, Navigate } from 'react-router-dom';
import './App.css';

function Home() {
  const [events, setEvents] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/events').then(res => res.json()).then(setEvents);
    fetch('http://localhost:3001/api/articles').then(res => res.json()).then(setArticles);
  }, []);

  return (
    <div>
      <h1>Meliran</h1>
      <nav>
        <Link to="/login">Admin Login</Link>
      </nav>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}><Link to={`/events/${event.id}`}>{event.title}</Link> - {event.date}</li>
        ))}
      </ul>
      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}><Link to={`/articles/${article.id}`}>{article.title}</Link> - {article.date}</li>
        ))}
      </ul>
    </div>
  );
}

function EventDetail({ eventId }) {
  const [event, setEvent] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${eventId}`).then(res => res.json()).then(setEvent);
  }, [eventId]);
  if (!event) return <p>Loading...</p>;
  return (
    <div>
      <h1>{event.title}</h1>
      <p>Date: {event.date}</p>
      <p>RSVP Count: {event.rsvpCount}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function ArticleDetail({ articleId }) {
  const [article, setArticle] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3001/api/articles/${articleId}`).then(res => res.json()).then(setArticle);
  }, [articleId]);
  if (!article) return <p>Loading...</p>;
  return (
    <div>
      <h1>{article.title}</h1>
      <p>Date: {article.date}</p>
      <p>{article.content}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function Login({ setIsAdmin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `password=${encodeURIComponent(password)}`,
      credentials: 'include' // Send cookies for session
    })
      .then(res => {
        if (res.ok) {
          setIsAdmin(true);
          window.location.href = '/'; // Redirect to home
        } else {
          setError('Incorrect password');
        }
      })
      .catch(err => setError('Login failed'));
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

function NewEvent({ isAdmin }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  if (!isAdmin) return <Navigate to="/login" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date }),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(() => window.location.href = '/')
      .catch(err => console.error('Error creating event:', err));
  };

  return (
    <div>
      <h1>New Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

function NewArticle({ isAdmin }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isAdmin) return <Navigate to="/login" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, date: new Date().toISOString().split('T')[0] }),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(() => window.location.href = '/')
      .catch(err => console.error('Error creating article:', err));
  };

  return (
    <div>
      <h1>New Article</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Article Content"
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if already logged in
    fetch('http://localhost:3001/api/events', { credentials: 'include' })
      .then(res => {
        if (res.ok) setIsAdmin(true); // Simplistic check; refine later
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:eventId" element={<EventDetail eventId={useParams().eventId} />} />
          <Route path="/articles/:articleId" element={<ArticleDetail articleId={useParams().articleId} />} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
          <Route path="/events/new" element={<NewEvent isAdmin={isAdmin} />} />
          <Route path="/articles/new" element={<NewArticle isAdmin={isAdmin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;