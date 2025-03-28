import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAdmin }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Meliran</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/events">Events</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/articles">Articles</Link></li>
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

export default Navbar;