import { useEffect, useState } from "react";
import { productApi } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi
      .getAll()
      .then((res) => {
        console.log("API products:", res.data); // <-- vérifie ici
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="home">
      <h1>Nos Vins</h1>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}
