"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react"; // ✅ הוספה של useEffect ו useRef
import CartDrawer from "../CartDrawer/CartDrawer"; // ✅ הוספה
import { useCartStore } from "@/app/store/cartStore";
import styles from "./Header.module.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const { cart } = useCartStore();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false); // ✅ ניהול פתיחה/סגירה

  // ✅ כאן שמים את ה-useEffect
  const prevCartCount = useRef(cart.length);
  useEffect(() => {
    if (cart.length > prevCartCount.current) {
      setIsCartOpen(true); // פותחים את החלונית אוטומטית כשמוסיפים מוצר
    }
    prevCartCount.current = cart.length;
  }, [cart]);
  return (
    <header className={styles.header}>
      {/* <div className={styles.logo}>
        <Link href="/">🛍️ MyStore</Link>
      </div> */}
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo2.jpg" alt="Logo" className={styles.logoImg} />
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/home">Home</Link>
        <Link href="/category/electronics">Electronics</Link>
        <Link href="/category/jewelery">Jewelery</Link>
        <Link href="/category/men's clothing">Men</Link>
        <Link href="/category/women's clothing">Women</Link>
        <Link href="/wishlist">Wishlist</Link>

        <button className={styles.cart} onClick={() => setIsCartOpen(true)}>
          <FaShoppingCart /> <span>{cartCount}</span>
        </button>
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
