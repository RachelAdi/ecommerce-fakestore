"use client";

import { useWishlistStore } from "../store/wishlistStore";
import ProductCard from "../components/ProductCard/ProductCard";
import styles from "./Wishlist.module.css";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  if (wishlist.length === 0)
    return <p style={{ padding: "2rem" }}>Your wishlist is empty</p>;

  return (
    <div className={styles.container}>
      <h1>My Wishlist</h1>
      <div className={styles.grid}>
        {wishlist.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
            <button
              className={styles.removeButton}
              onClick={() => removeFromWishlist(product.id)}
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
