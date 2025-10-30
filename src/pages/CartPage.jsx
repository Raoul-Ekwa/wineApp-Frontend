import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartAsync,
  removeFromCartAsync,
  clearCart,
  updateQuantityAsync,
} from "../redux/store/cartSlice";
import CartItem from "../components/CartItem";
import "../styles/CartPage.scss";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const handleRemove = (id) => dispatch(removeFromCartAsync(id));

  const handleClear = () => dispatch(clearCart());

  const handleIncrease = (item) =>
    dispatch(updateQuantityAsync({ id: item.id, quantity: item.quantity + 1 }));

  const handleDecrease = (item) =>
    dispatch(updateQuantityAsync({ id: item.id, quantity: item.quantity - 1 }));

  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * item.Product.price,
    0
  );

  if (status === "loading") return <p>Chargement du panier...</p>;
  if (status === "failed") return <p>Erreur: {error}</p>;

  return (
    <div className="cart-page">
      <h1>Mon Panier</h1>

      {items.length === 0 ? (
        <p>Votre panier est vide 🛒</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item.Product}
                quantity={item.quantity}
                onRemove={() => handleRemove(item.id)}
                onIncrease={() => handleIncrease(item)}
                onDecrease={() => handleDecrease(item)}
              />
            ))}
          </div>

          <div className="cart-summary">
            <p>
              Total: <span>{totalPrice.toFixed(2)} €</span>
            </p>

            <div className="cart-buttons">
              <button className="btn btn-clear" onClick={handleClear}>
                Vider le panier
              </button>
              <button
                className="btn btn-buy"
                onClick={() => navigate("/checkout")}
              >
                Acheter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
