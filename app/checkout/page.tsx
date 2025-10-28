// "use client";

// import { useCartStore } from "../store/cartStore";
// import { useEffect, useState } from "react";
// import styles from "./Checkout.module.css";

// export default function CheckoutPage() {
//   const { cart, removeFromCart, updateQuantity } = useCartStore();
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const sum = cart.reduce(
//       (acc, item) => acc + item.price * (item.quantity || 1),
//       0
//     );
//     setTotal(sum);
//   }, [cart]);

//   if (cart.length === 0)
//     return <p style={{ padding: "2rem" }}>Your cart is empty</p>;

//   return (
//     <div className={styles.container}>
//       <h1>Checkout</h1>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.map((item) => (
//             <tr key={item.id}>
//               <td>{item.title}</td>
//               <td>${item.price}</td>
//               <td>
//                 <input
//                   className={styles.quantityInput}
//                   type="number"
//                   min={1}
//                   value={item.quantity || 1}
//                   onChange={(e) =>
//                     updateQuantity(item.id, Number(e.target.value))
//                   }
//                 />
//               </td>
//               <td>${((item.quantity || 1) * item.price).toFixed(2)}</td>
//               <td>
//                 <button
//                   className={styles.removeButton}
//                   onClick={() => removeFromCart(item.id)}
//                 >
//                   Remove
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h2>Total: ${total.toFixed(2)}</h2>
//     </div>
//   );
// }
"use client";

import { useCartStore } from "../store/cartStore";
import { useEffect, useState } from "react";
import styles from "./Checkout.module.css";

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
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
              <input
                type="number"
                min={1}
                value={item.quantity || 1}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
              />
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
