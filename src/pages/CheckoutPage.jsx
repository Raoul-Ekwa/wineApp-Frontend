// src/pages/CheckoutPage.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api/orderApi";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
        })),
        total: cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
      };
      const response = await createOrder(orderData);
      clearCart();
      navigate(`/order-success/${response.id}`);
    } catch (err) {
      console.error("Erreur lors du paiement:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
          <p>
            Total: $
            {cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0)}
          </p>
          <button onClick={handleCheckout} disabled={loading}>
            {loading ? "Paiement en cours..." : "Payer maintenant"}
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
