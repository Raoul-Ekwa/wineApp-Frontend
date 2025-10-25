import { useState } from "react";
import { authApi } from "../api/authApi";
import "../styles/ForgotPasswordPage.scss";

export default function ForgotPasswordPage() {
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!telephone) {
      return setError("Veuillez entrer votre numéro de téléphone.");
    }

    try {
      await authApi.requestPasswordReset({ telephone });
      setSuccess("Un lien de réinitialisation a été envoyé !");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la demande de réinitialisation"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Réinitialisation du mot de passe</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Votre numéro de téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          <button type="submit">Envoyer le lien</button>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
        </form>
      </div>
    </div>
  );
}
