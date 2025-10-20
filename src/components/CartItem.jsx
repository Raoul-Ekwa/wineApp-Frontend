// src/components/CartItem.jsx
import React from "react";
import "./CartItem.scss"; // à créer si besoin

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item__image" />
      <div className="cart-item__info">
        <h4>{item.name}</h4>
        <p>Prix: ${item.price}</p>
        <p>Quantité: {item.quantity}</p>
        <button onClick={() => onRemove(item.id)}>Supprimer</button>
      </div>
    </div>
  );
};

export default CartItem;
