// components/ProductCard.jsx
import { useNavigate } from "react-router-dom";
import "../styles/components/productCard.scss";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/products/${product.id}`)
      }
    >
      <img
        src={product.image}
        alt={product.name}
        className="product-card__image"
      />
      <div className="product-card__content">
        <h2 className="product-card__title">{product.name}</h2>
        <p className="product-card__price">{product.price} FCFA</p>
      </div>
    </div>
  );
}
