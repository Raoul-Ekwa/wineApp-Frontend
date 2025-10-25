import { useState } from "react";
import { authApi } from "../api/authApi";
import "../styles/RegisterPage.scss";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", telephone: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.telephone || !form.password) {
      return setError("Veuillez remplir tous les champs !");
    }

    try {
      await authApi.register(form);
      alert("Inscription réussie !");
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nom"
            value={form.name}
            onChange={handleChange}
          />
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
          <button type="submit">S’inscrire</button>
          {error && <div className="error-msg">{error}</div>}
        </form>
      </div>
    </div>
  );
}
