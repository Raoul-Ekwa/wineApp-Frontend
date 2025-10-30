// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo.jpg";
import "../styles/Navbar.scss";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const token = localStorage.getItem("token");
  const userLogged = !!token;

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
          {userLogged ? (
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
