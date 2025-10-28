"use client";

import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0)
    return <p style={{ padding: "2rem" }}>No products found</p>;

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
