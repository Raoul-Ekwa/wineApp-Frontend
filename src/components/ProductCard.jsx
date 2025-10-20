import "../styles/components/productCard.scss";

export default function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <img src={product.image} alt={product.name} />

      <div className="product-card">
        <h2>TEST: {product.name}</h2>
      </div>

      <p>{product.price} €</p>
    </div>
  );
}
