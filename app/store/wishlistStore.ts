import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface WishlistStore {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  wishlist: [],
  addToWishlist: (product) =>
    set((state) => {
      if (!state.wishlist.find((p) => p.id === product.id)) {
        return { wishlist: [...state.wishlist, product] };
      }
      return state;
    }),
  removeFromWishlist: (id) =>
    set((state) => ({ wishlist: state.wishlist.filter((p) => p.id !== id) })),
}));
