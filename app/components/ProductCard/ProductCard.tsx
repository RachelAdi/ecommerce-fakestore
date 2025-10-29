"use client";

import Link from "next/link";
import { useCartStore } from "../../store/cartStore";
import { useUIStore } from "../../store/uiStore";
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
  const { openCart } = useUIStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const isInWishlist = wishlist.some((p) => p.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

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
          <button
            onClick={() => {
              addToCart({ ...product, quantity: 1 });
              openCart();
            }}
          >
            Add to Cart
          </button>

          <button
            onClick={toggleWishlist}
            className={
              isInWishlist ? styles.activeWishlistBtn : styles.wishlistBtn
            }
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}
