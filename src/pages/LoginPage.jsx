import { useState } from "react";
import { authApi } from "../api/authApi";
import "../styles/LoginPage.scss";
import { Link } from "react-router-dom"; // ← pour les liens internes

export default function LoginPage() {
  const [form, setForm] = useState({ telephone: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.telephone || !form.password) {
      return setError("Veuillez remplir tous les champs !");
    }

    try {
      const response = await authApi.login(form);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
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
            name="telephone"
            placeholder="Téléphone"
            value={form.telephone}
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
      </div>
    </div>
  );
}
