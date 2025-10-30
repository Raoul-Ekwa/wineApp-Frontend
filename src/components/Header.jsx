import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // 🔹 importer useSelector
import logo from "../assets/images/logo.svg";
import "../styles/header.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 Récupérer le panier depuis Redux
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

          {/* 🔹 Panier avec badge dynamique */}
          <Link to="/cart" onClick={closeMenu} className="cart-link">
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
