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
