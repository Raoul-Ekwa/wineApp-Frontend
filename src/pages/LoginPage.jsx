import { useState } from "react";
import { authApi } from "../api/authApi";
import "../styles/LoginPage.scss";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ login: "", password: "" }); // login = email ou téléphone
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.login || !form.password) {
      return setError("Veuillez remplir tous les champs !");
    }

    try {
      const response = await authApi.login(form); // envoi { login, password }
      localStorage.setItem("token", response.data.token);
      window.location.href = "/"; // redirection vers la page d'accueil
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="login"
            placeholder="Email ou Téléphone"
            value={form.login}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit">Se connecter</button>
          {error && <div className="error-msg">{error}</div>}
        </form>

        <div className="forgot-password">
          <Link to="/ForgotPassword">Mot de passe oublié ?</Link>
        </div>

        {/* Nouveau lien vers la page d'inscription */}
        <div className="auth-footer">
          <p className="register">
            Pas de compte ? <Link to="/Register">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
