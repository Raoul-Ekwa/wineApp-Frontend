import { useState } from "react";
import { authApi } from "../api/authApi";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authApi.register(form);
    alert("Inscription réussie !");
    window.location.href = "/login";
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          onChange={handleChange}
        />
        <button type="submit">S’inscrire</button>
      </form>
    </div>
  );
}
