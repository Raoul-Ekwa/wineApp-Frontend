import { useEffect, useState } from "react";
import { productApi } from "../api/productApi";
import ProductCard from "../components/ProductCard";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productApi.getAll().then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="product-list">
      <h2>Tous nos vins</h2>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
