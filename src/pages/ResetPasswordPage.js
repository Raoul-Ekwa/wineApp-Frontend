import { useState } from "react";
import { authApi } from "../api/authApi";
import "../styles/LoginPage.scss";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!token || !newPassword) {
      return setMessage("Veuillez remplir tous les champs !");
    }

    try {
      // ⚠️ Le token envoyé doit être complet
      const res = await authApi.resetPassword(token, { newPassword });

      setMessage(res.data.message || "Mot de passe réinitialisé avec succès !");
      setToken("");
      setNewPassword("");
    } catch (err) {
      console.error("Erreur API resetPassword: ", err);
      setMessage(
        err.response?.data?.message ||
          "Erreur inconnue lors de la réinitialisation"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Réinitialiser le mot de passe</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Token reçu par SMS"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Réinitialiser</button>

          {message && (
            <p
              className={
                message.toLowerCase().includes("erreur")
                  ? "error-msg"
                  : "success-msg"
              }
            >
              {message}
            </p>
          )}
        </form>

        <div className="auth-footer">
          <p className="register">
            <a href="/Login">Retour à la connexion</a>
          </p>
        </div>
      </div>
    </div>
  );
}
