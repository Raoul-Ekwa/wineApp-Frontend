// src/pages/OrderSuccessPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../api/orderApi";

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        console.error("Erreur chargement commande:", err);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Chargement de la commande...</p>;

  return (
    <div className="order-success-page">
      <h1>Commande #{order.id} confirmée !</h1>
      <p>Merci pour votre achat, {order.user.name}.</p>
      <p>Total: ${order.total}</p>
      <Link to="/products">Retour aux produits</Link>
    </div>
  );
};

export default OrderSuccessPage;
