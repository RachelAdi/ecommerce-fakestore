"use client";

import { useEffect, useState } from "react";
import ProductList from "./../components/ProductList/ProductList";
import styles from "./HomePage.module.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.loading}>Loading products...</p>;

  return (
    <div className="homePage">
      <div className={styles.logoContainer}>
        <img src="../../logo2.jpg" alt="Logo" className="logo" />
      </div>
      <h1 className={styles.title}>Latest Products</h1>
      <ProductList products={products} />
    </div>
  );
}
