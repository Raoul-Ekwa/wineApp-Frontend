// src/pages/ProductDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync, fetchCartAsync } from "../redux/store/cartSlice";
import { productApi } from "../api/productApi";
import "../styles/productDetailPage.scss";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState(false);

  // Récupération du produit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApi.getById(id);
        setProduct(res.data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };
    fetchProduct();
  }, [id]);

  // Charger le panier au chargement
  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const handleAddToCart = async () => {
    if (!product || product.stock === 0) return;

    setAdding(true);
    try {
      await dispatch(
        addToCartAsync({ productId: product.id, quantity: 1 })
      ).unwrap();
      dispatch(fetchCartAsync()); // ⚡ recharge le panier complet avec Product

      dispatch(fetchCartAsync());
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    } catch (err) {
      console.error("Erreur ajout panier :", err);
    } finally {
      setAdding(false);
    }
  };

  if (status === "loading") return <div className="loader">Chargement...</div>;
  if (status === "error" || !product)
    return <p className="error-text">❌ Produit introuvable</p>;

  const quantityInCart =
    cart.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <div className="product-detail-container">
      <div className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {product.stock === 0 && <span className="out-of-stock">Rupture</span>}
          {quantityInCart > 0 && (
            <span className="cart-badge">+{quantityInCart} au panier</span>
          )}
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-meta">
            <span className="price">{product.price.toFixed(2)} €</span>
            <span
              className={`stock ${
                product.stock > 0 ? "in-stock" : "out-stock"
              }`}
            >
              {product.stock > 0
                ? `En stock (${product.stock})`
                : "Rupture de stock"}
            </span>
          </div>

          <button
            className={`add-to-cart-btn ${
              product.stock === 0 ? "disabled" : ""
            } ${adding ? "adding" : ""}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0 || adding}
          >
            🛒{" "}
            {adding
              ? "Ajout..."
              : product.stock === 0
              ? "Rupture de stock"
              : "Ajouter au panier"}
          </button>
        </div>
      </div>

      {toast && <div className="toast">✅ Produit ajouté au panier !</div>}
    </div>
  );
}
