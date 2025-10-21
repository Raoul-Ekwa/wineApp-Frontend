// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg"; // Garde le logo si tu veux l'afficher
import "../styles/Navbar.scss"; // À créer

const Navbar = ({ cartCount = 0, user = null }) => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="WineShop" />
          <span>WineShop</span>
        </Link>

        <div className="navbar__links">
          <Link to="/products">Produits</Link>
          <Link to="/cart" className="navbar__cart">
            🛒
            {cartCount > 0 && (
              <span className="navbar__badge">{cartCount}</span>
            )}
          </Link>

          {user ? (
            <Link to="/profile">Profil</Link>
          ) : (
            <Link to="/login">Se connecter</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
