import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams, Navigate } from 'react-router-dom';
import './App.css';

function Navbar({ isAdmin }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Meliran</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/article-charter">Article Charter</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/team">Meliran Team</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/occasions">Occasions</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/events">Events</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/articles">Articles</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
        </ul>
        <ul className="navbar-nav">
          {isAdmin ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/events/new">New Event</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/articles/new">New Article</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
            </>
          ) : (
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

function Home() {
  const [events, setEvents] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/events').then(res => res.json()).then(setEvents);
    fetch('http://localhost:3001/api/articles').then(res => res.json()).then(setArticles);
  }, []);
  return (
    <div className="container mt-4">
      <h1>Welcome to Meliran</h1>
      <h2>Events</h2>
      <ul className="list-group mb-4">
        {events.map(event => (
          <li key={event.id} className="list-group-item">
            <Link to={`/events/${event.id}`}>{event.title}</Link> - {event.date}
          </li>
        ))}
      </ul>
      <h2>Articles</h2>
      <ul className="list-group">
        {articles.map(article => (
          <li key={article.id} className="list-group-item">
            <Link to={`/articles/${article.id}`}>{article.title}</Link> - {article.date}
          </li>
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
    <div className="container mt-4">
      <h1>{event.title}</h1>
      <p>Date: {event.date}</p>
      <p>RSVP Count: {event.rsvpCount}</p>
      <Link to="/events" className="btn btn-secondary">Back</Link>
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
    <div className="container mt-4">
      <h1>{article.title}</h1>
      <p>Date: {article.date}</p>
      <p>{article.content}</p>
      <Link to="/articles" className="btn btn-secondary">Back</Link>
    </div>
  );
}

function About() {
  return (
    <div className="container mt-4">
      <h1>About</h1>
      <p>This is the About page for Meliran.</p>
    </div>
  );
}

function ArticleCharter() {
  return (
    <div className="container mt-4">
      <h1>Article Charter</h1>
      <p>Guidelines and principles for Meliran articles.</p>
    </div>
  );
}

function Team() {
  return (
    <div className="container mt-4">
      <h1>Meliran Team</h1>
      <p>Meet the Meliran Team!</p>
    </div>
  );
}

function Occasions() {
  return (
    <div className="container mt-4">
      <h1>Occasions</h1>
      <p>Special occasions celebrated by Meliran.</p>
    </div>
  );
}

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`,
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccess(true);
          setName(''); setEmail(''); setMessage('');
        }
      });
  };

  return (
    <div className="container mt-4">
      <h1>Contact Us</h1>
      {success && <p className="alert alert-success">Message sent!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        </div>
        <div className="mb-3">
          <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div className="mb-3">
          <textarea className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" required />
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
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
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsAdmin(true);
          window.location.href = '/';
        } else {
          setError('Incorrect password');
        }
      });
  };

  return (
    <div className="container mt-4">
      <h1>Admin Login</h1>
      {error && <p className="alert alert-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
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
    }).then(() => window.location.href = '/events');
  };
  return (
    <div className="container mt-4">
      <h1>New Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" required />
        </div>
        <div className="mb-3">
          <input className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
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
    }).then(() => window.location.href = '/articles');
  };
  return (
    <div className="container mt-4">
      <h1>New Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article Title" required />
        </div>
        <div className="mb-3">
          <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
        </div>
        <button type="submit" class="btn btn-primary">Publish</button>
      </form>
    </div>
  );
}

function Logout() {
  useEffect(() => {
    fetch('http://localhost:3001/logout', { credentials: 'include' })
      .then(() => window.location.href = '/');
  }, []);
  return <p className="container mt-4">Logging out...</p>;
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    fetch('http://localhost:3001/api/events', { credentials: 'include' })
      .then(res => {
        if (res.ok) setIsAdmin(true); // Rough check; refine later
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Home />} /> {/* Reuse Home for now */}
          <Route path="/articles" element={<Home />} /> {/* Reuse Home for now */}
          <Route path="/events/:eventId" element={<EventDetail eventId={useParams().eventId} />} />
          <Route path="/articles/:articleId" element={<ArticleDetail articleId={useParams().articleId} />} />
          <Route path="/about" element={<About />} />
          <Route path="/article-charter" element={<ArticleCharter />} />
          <Route path="/team" element={<Team />} />
          <Route path="/occasions" element={<Occasions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
          <Route path="/events/new" element={<NewEvent isAdmin={isAdmin} />} />
          <Route path="/articles/new" element={<NewArticle isAdmin={isAdmin} />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;