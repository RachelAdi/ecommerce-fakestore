"use client";

import { useCartStore } from "../../store/cartStore";
import { useRouter } from "next/navigation";
import styles from "./CartDrawer.module.css";

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const router = useRouter();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };
  if (!isOpen) return null; // 👈 אם לא פתוח – לא מציגים כלום

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.dropdown}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        <h3>Your Cart</h3>

        {cart.length === 0 ? (
          <p className={styles.empty}>Your cart is empty</p>
        ) : (
          <>
            <div className={styles.items}>
              {cart.map((item) => (
                <div key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.title} />
                  <div className={styles.info}>
                    <p className={styles.title}>{item.title}</p>
                    <p>${item.price}</p>
                    <div className={styles.quantityControls}>
                      <button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.remove}
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <button
              className={styles.viewCart}
              onClick={() => {
                onClose();
                router.push("/checkout");
              }}
            >
              View Full Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
