import "../styles/productDetailPage.scss"; // Ajoute ce fichier SCSS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productApi } from "../api/productApi";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApi.getById(id);
        setProduct(res.data);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchProduct();
  }, [id]);

  if (status === "loading") return <p>Chargement...</p>;
  if (status === "error" || !product) return <p>Produit introuvable</p>;

  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-detail__info">
        <h2>{product.name}</h2>
        <p className="product-detail__description">{product.description}</p>
        <p className="product-detail__price">{product.price} €</p>
        <p className="product-detail__stock">
          Stock : {product.stock > 0 ? product.stock : "Rupture de stock"}
        </p>
        <button
          className="product-detail__button"
          onClick={() => alert("Produit ajouté au panier")}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
}
