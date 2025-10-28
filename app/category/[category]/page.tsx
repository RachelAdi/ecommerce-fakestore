// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { useCartStore } from "@/app/store/cartStore";
// import { useWishlistStore } from "@/app/store/wishlistStore";
// import styles from "./CategoryPage.module.css";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
// }

// export default function CategoryPage() {
//   const params = useParams();
//   const category = params?.category || "";

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const { addToCart } = useCartStore();
//   const { addToWishlist } = useWishlistStore();

//   useEffect(() => {
//     fetch(`https://fakestoreapi.com/products/category/${category}`)
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .finally(() => setLoading(false));
//   }, [category]);

//   if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
//   if (products.length === 0)
//     return <p style={{ padding: "2rem" }}>No products found</p>;

//   return (
//     <div className={styles.container}>
//       <h1>{category}</h1>
//       <div className={styles.grid}>
//         {products.map((product) => (
//           <div key={product.id} className={styles.card}>
//             <Link href={`/product/${product.id}`}>
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className={styles.image}
//               />
//             </Link>
//             <h3>{product.title}</h3>
//             <p className={styles.price}>${product.price}</p>
//             <div className={styles.buttons}>
//               <button
//                 className={styles.cartButton}
//                 onClick={() => addToCart(product)}
//               >
//                 Add to Cart
//               </button>
//               <button
//                 className={styles.wishlistButton}
//                 onClick={() => addToWishlist(product)}
//               >
//                 ♡ Wishlist
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductList from "../../components/ProductList/ProductList";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>{category}</h1>
      <ProductList products={products} />
    </div>
  );
}
