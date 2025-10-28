"use client";

import { useCartStore } from "../store/cartStore";
import { useEffect, useState } from "react";
import styles from "./Checkout.module.css";

export default function CheckoutPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartStore();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setTotal(sum);
  }, [cart]);

  if (cart.length === 0)
    return <p style={{ padding: "2rem" }}>Your cart is empty</p>;

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className={styles.item}>
          <img src={item.image} alt={item.title} className={styles.image} />
          <div className={styles.info}>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <div className={styles.quantity}>
              <label>Qty:</label>
              <div className={styles.quantityControls}>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className={styles.total}>
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
}
