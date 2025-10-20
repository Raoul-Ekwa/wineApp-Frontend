import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="WineShop" />
      </Link>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/products">Produits</Link>
        <Link to="/cart">Panier</Link>
        <Link to="/login">Connexion</Link>
      </nav>
    </header>
  );
}
