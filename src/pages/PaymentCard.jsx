import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentCard.scss";

export default function PaymentCard() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const handlePayment = () => {
    // Validation simple
    if (
      cardNumber.length < 16 ||
      !cardNumber.match(/^\d+$/) ||
      cardName.trim() === "" ||
      !expiry.match(/^\d{2}\/\d{2}$/) ||
      !cvv.match(/^\d{3,4}$/)
    ) {
      setError("Veuillez remplir correctement tous les champs.");
      return;
    }

    setError("");
    alert("Paiement par carte bancaire effectué avec succès !");
    navigate("/confirmation", { state: { paymentMethod: "card" } });
  };

  return (
    <div className="payment-card-page">
      <h1>Paiement Carte Bancaire</h1>

      <div className="card-form">
        <label>
          Numéro de carte
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
          />
        </label>

        <label>
          Nom du titulaire
          <input
            type="text"
            placeholder="Nom Prénom"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </label>

        <div className="card-details">
          <label>
            Date d'expiration
            <input
              type="text"
              placeholder="MM/AA"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </label>

          <label>
            CVV
            <input
              type="text"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <button className="btn-pay" onClick={handlePayment}>
          Payer maintenant
        </button>
      </div>
    </div>
  );
}
