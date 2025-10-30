import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentMomo.scss";

export default function PaymentMomoPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!phone.match(/^\d{9,}$/)) {
      setError("Veuillez entrer un numéro valide d'au moins 9 chiffres.");
      return;
    }
    setError("");
    // 🔹 Ici, tu peux appeler ton API de paiement Mobile Money
    alert(`Paiement en cours pour ${phone}`);
    navigate("/confirmation", { state: { paymentMethod: "momo", phone } });
  };

  return (
    <div className="payment-momo-page">
      <h1>Paiement Mobile Money</h1>
      <p>Entrez votre numéro Mobile Money pour payer :</p>

      <input
        type="tel"
        placeholder="Ex: 690123456"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <button className="btn-pay" onClick={handlePayment}>
        Payer maintenant
      </button>
    </div>
  );
}
