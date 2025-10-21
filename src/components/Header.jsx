import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import "../styles/header.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = 3; // <-- à remplacer plus tard par un vrai state/cart context

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <img src={logo} alt="WineShop" />
          <span>WineShop</span>
        </Link>

        <button
          className={`header__burger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Accueil
          </Link>
          <Link to="/products" onClick={closeMenu}>
            Produits
          </Link>
          <Link to="/login" onClick={closeMenu}>
            Connexion
          </Link>
          <Link to="/cart" onClick={closeMenu} className="cart-link">
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
