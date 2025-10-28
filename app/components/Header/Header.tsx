"use client";

import Link from "next/link";
import { useCartStore } from "@/app/store/cartStore";
import styles from "./Header.module.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const { cart } = useCartStore();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">🛍️ MyStore</Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/home">Home</Link>
        <Link href="/category/electronics">Electronics</Link>
        <Link href="/category/jewelery">Jewelery</Link>
        <Link href="/category/men's clothing">Men</Link>
        <Link href="/category/women's clothing">Women</Link>
        <Link href="/wishlist">Wishlist</Link>
        <Link href="/checkout" className={styles.cart}>
          <FaShoppingCart /> <span>{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
}
