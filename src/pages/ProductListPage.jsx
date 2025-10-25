import { useEffect, useState } from "react";
import { productApi } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import "../styles/productListPage.scss";

const PRICE_FILTERS = [
  { label: "Tous", value: "all" },
  { label: "< 15 FCFA", value: "under15" },
  { label: "15 FCFA - 25 FCFA", value: "15to25" },
  { label: "> 25 FCFA", value: "over25" },
];

const PRODUCTS_PER_PAGE = 6;

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    productApi.getAll().then((res) => {
      setProducts(res.data);
      setFiltered(res.data);
    });
  }, []);

  // Filtrage par prix
  useEffect(() => {
    let filteredProducts = [...products];
    if (selectedFilter === "under15") {
      filteredProducts = products.filter((p) => p.price < 15);
    } else if (selectedFilter === "15to25") {
      filteredProducts = products.filter((p) => p.price >= 15 && p.price <= 25);
    } else if (selectedFilter === "over25") {
      filteredProducts = products.filter((p) => p.price > 25);
    }
    setFiltered(filteredProducts);
    setCurrentPage(1); // reset pagination
  }, [selectedFilter, products]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="product-list">
      <h2 className="product-list__title">Tous nos vins</h2>

      {/* FILTRE PRIX */}
      <div className="product-list__filters">
        {PRICE_FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter-btn ${
              selectedFilter === f.value ? "active" : ""
            }`}
            onClick={() => setSelectedFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* GRILLE PRODUITS */}
      <div className="product-list__grid">
        {paginated.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
