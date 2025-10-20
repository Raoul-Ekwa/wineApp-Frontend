// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss"; // à créer

const Navbar = ({ cartCount, user }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        WineShop
      </Link>
      <div className="navbar__links">
        <Link to="/products">Produits</Link>
        <Link to="/cart">Panier ({cartCount})</Link>
        {user ? (
          <Link to="/profile">Profil</Link>
        ) : (
          <Link to="/login">Se connecter</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
