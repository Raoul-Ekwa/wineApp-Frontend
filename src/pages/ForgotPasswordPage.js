import { useState } from "react";
import { authApi } from "../api/authApi";
import "../styles/LoginPage.scss";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [tokenSimule, setTokenSimule] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setTokenSimule("");

    if (!telephone) return setMessage("Veuillez entrer votre téléphone !");

    try {
      const res = await authApi.requestPasswordReset({ telephone });
      setMessage(res.data.message || "SMS envoyé");

      // Affichage d’un aperçu court pour l’utilisateur
      if (res.data.simulatedToken) setTokenSimule(res.data.simulatedToken);
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur inconnue");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Réinitialisation du mot de passe</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          <button type="submit">Envoyer</button>

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

          {tokenSimule && (
            <div className="token-box">
              <p className="success-msg">
                Token simulé : <strong>{tokenSimule.slice(0, 15)}...</strong>
                <button
                  className="copy-btn"
                  onClick={() => navigator.clipboard.writeText(tokenSimule)}
                >
                  Copier le token complet
                </button>
              </p>
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p className="register">
            <Link to="/ResetPassword">
              J'ai reçu mon token, réinitialiser le mot de passe
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
