import { useEffect, useState } from "react";
import { productApi } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import "../styles/home.scss";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Nouveau : gestion d’erreur

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productApi.getAll();
        setProducts(data);
      } catch (err) {
        console.error("Erreur API:", err);
        setError("Une erreur est survenue lors du chargement des produits.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <h1>Découvrez nos produits en magasin</h1>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}
