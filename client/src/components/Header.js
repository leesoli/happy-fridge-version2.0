import React from 'react';
import { Link } from 'react-router-dom';
import { switchBackground, closeSidebar, openSidebar, toggleNav, closeNav, checkWindowSize, setActive } from '../helpers';

export default function Header () {
  window.addEventListener("resize", checkWindowSize);

  return (
    <header className="header">
      <nav className="nav">
        <button
          className="nav-toggle"
          onClick={toggleNav}
        >
          <span className="nav-icon"></span>
        </button>
        <ul className="nav-list">
          <li
            className="nav-list-item home active"
            onClick={() => {
              setActive('home');
              switchBackground(false);
              openSidebar();
            }}
          >
            <Link
              to="/"
              onClick={closeNav}
            >Recipe
            </Link>
          </li>
          <li
            className="nav-list-item about"
            onClick={() => {
              setActive('about');
              switchBackground(false);
            }}
          >
            <Link
              to="/about"
              onClick={closeNav}
            >About
            </Link>
          </li>
        </ul>

        <h1
          className="logo"
          onClick={() => {
            setActive('home')
            switchBackground(true);
          }}
        >
          <Link
            to="/"
            onClick={closeNav}
          >Happy Fridge
          </Link>
        </h1>
      </nav>

      <h1 className="opening-title">Easy  •  Fun  •  Sustainable</h1>

      <button
        className="sidebar-toggle"
        onClick={() => {
          openSidebar();
          switchBackground(false);
        }}
      >
      Find Recipe
      </button>
    </header>
  )
}