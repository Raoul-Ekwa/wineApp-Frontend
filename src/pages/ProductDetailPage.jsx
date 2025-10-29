import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../redux/store/CartSlice";
import { productApi } from "../api/productApi";
import "../styles/productDetailPage.scss";

export default function ProductDetailPage({ userId }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

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

  const handleAddToCart = async () => {
    if (!product || product.stock === 0) return;

    dispatch(addToCartAsync({ userId, productId: product.id }));
  };

  if (status === "loading") return <p>Chargement...</p>;
  if (status === "error" || !product) return <p>Produit introuvable</p>;

  // Vérifie si produit est déjà dans le panier pour le badge
  const quantityInCart =
    cart.find((item) => item.productId === product.id)?.quantity || 0;

  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-detail__info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price} €</p>
        <p>Stock : {product.stock}</p>

        <button onClick={handleAddToCart} disabled={product.stock === 0}>
          {product.stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
        </button>

        {quantityInCart > 0 && (
          <span className="cart-badge">Dans le panier : {quantityInCart}</span>
        )}
      </div>
    </div>
  );
}
