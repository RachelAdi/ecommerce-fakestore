"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import CartDrawer from "../CartDrawer/CartDrawer";
import { useCartStore } from "@/app/store/cartStore";
import styles from "./Header.module.css";
import { FaShoppingCart } from "react-icons/fa";
import UIStore from "@/app/store/uiStore";


export default function Header() {
  const { openCart } = UIStore();
  const { cart } = useCartStore();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  // const [isCartOpen, setIsCartOpen] = useState(false);

  const prevCartCount = useRef(cart.length);

  useEffect(() => {
    if (cart.length > prevCartCount.current) {
      openCart(); // Open cart drawer on item addition
    }
    prevCartCount.current = cart.length;
  }, [cart]);

  // useEffect(() => {
  //   if (cart.length > prevCartCount.current) {
  //     setIsCartOpen(true); // Open cart drawer on item addition
  //   }
  //   prevCartCount.current = cart.length;
  // }, [cart]);

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

        <button className={styles.cart} onClick={() => openCart()}>
          <FaShoppingCart /> <span>{cartCount}</span>
        </button>
      </nav>
      <CartDrawer />
    </header>
  );
}
