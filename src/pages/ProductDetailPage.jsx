import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productApi } from "../api/productApi";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    productApi.getById(id).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="product-detail">
      <img src={product.image_url} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>{product.price} €</h3>
      <button>Ajouter au panier</button>
    </div>
  );
}
