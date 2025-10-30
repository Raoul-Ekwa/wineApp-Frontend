import React from "react";
import "../styles/CartItem.scss";

export default function CartItem({
  item,
  quantity,
  onRemove,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="cart-item__info">
        <h4>{item.name}</h4>
        <p>Prix: {item.price.toFixed(2)} €</p>

        <div className="quantity">
          <button onClick={onDecrease} disabled={quantity <= 1}>
            −
          </button>
          <span>{quantity}</span>
          <button onClick={onIncrease}>+</button>
        </div>

        <button className="remove-btn" onClick={onRemove}>
          Supprimer
        </button>
      </div>
    </div>
  );
}
