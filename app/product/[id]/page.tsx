
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import styles from "./ProductDetail.module.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCartStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const isInWishlist = product
    ? wishlist.some((p) => p.id === product.id)
    : false;

  const toggleWishlist = () => {
    if (!product) return;
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  useEffect(() => {
    if (!params?.id) return;

    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [params]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading product...</p>;
  if (!product) return <p style={{ padding: "2rem" }}>Product not found</p>;

  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.info}>
        <h1>{product.title}</h1>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p>
        <div className={styles.buttons}>
          <button onClick={() => addToCart({ ...product, quantity: 1 })}>
            Add to Cart
          </button>

          {/* כפתור לב */}
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
