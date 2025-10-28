"use client";

import Link from "next/link";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import styles from "./ProductCard.module.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCartStore();
  const { addToWishlist } = useWishlistStore();

  return (
    <div className={styles.card}>
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <h3>{product.title}</h3>
      <p className={styles.category}>{product.category}</p>
      <p className={styles.desc}>{product.description.slice(0, 100)}...</p>
      <div className={styles.bottom}>
        <span className={styles.price}>${product.price}</span>
        <div className={styles.buttons}>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button onClick={() => addToWishlist(product)}>♡</button>
        </div>
      </div>
    </div>
  );
}
