// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { getAllOrders } from "../api/orderApi";
import ProductCard from "../components/ProductCard";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prods = await getProducts();
        const ords = await getAllOrders();
        setProducts(prods);
        setOrders(ords);
      } catch (error) {
        console.error("Erreur chargement admin:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Tableau de bord Admin</h1>

      <section>
        <h2>Produits</h2>
        <div className="product-list">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2>Commandes</h2>
        <ul>
          {orders.map((o) => (
            <li key={o.id}>
              Commande #{o.id} - {o.user.name} - {o.total}$
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
