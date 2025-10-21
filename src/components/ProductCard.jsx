import "../styles/components/productCard.scss";

export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="product-card"
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(product)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="product-card__image"
      />

      <div className="product-card__content">
        <h2 className="product-card__title">{product.name}</h2>
        <p className="product-card__price">{product.price} €</p>
      </div>
    </div>
  );
}
