import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.scss";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      alert("Veuillez choisir un mode de paiement !");
      return;
    }

    // Redirection vers la page correspondante selon le mode choisi
    if (paymentMethod === "momo") {
      navigate("/payment-momo");
    } else if (paymentMethod === "card") {
      navigate("/payment-card");
    }
  };

  return (
    <div className="checkout-page">
      <h1>Choisissez votre mode de paiement</h1>

      <div className="payment-options">
        <div
          className={`payment-card ${
            paymentMethod === "momo" ? "selected" : ""
          }`}
          onClick={() => handlePaymentSelection("momo")}
        >
          <h3>Mobile Money</h3>
          <p>Payer via Orange Money, MTN Mobile Money, etc.</p>
        </div>

        <div
          className={`payment-card ${
            paymentMethod === "card" ? "selected" : ""
          }`}
          onClick={() => handlePaymentSelection("card")}
        >
          <h3>Carte Bancaire</h3>
          <p>Payer avec votre carte Visa ou Mastercard.</p>
        </div>
      </div>

      <button className="btn-confirm" onClick={handleConfirmPayment}>
        Confirmer le paiement
      </button>
    </div>
  );
}
