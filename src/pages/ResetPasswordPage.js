import { useState } from "react";
import { authApi } from "../api/authApi";
import { useParams } from "react-router-dom";
import "./ResetPasswordPage.scss";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newPassword) {
      return setError("Veuillez entrer un nouveau mot de passe.");
    }

    try {
      await authApi.resetPassword(token, { newPassword });
      setSuccess("Mot de passe réinitialisé avec succès !");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la réinitialisation"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Réinitialiser le mot de passe</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Réinitialiser</button>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
        </form>
      </div>
    </div>
  );
}
