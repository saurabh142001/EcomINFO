import { create } from "zustand";
import toast from "react-hot-toast";

const sampleData = [
  { _id: "1", name: "Product A", category: "electronics", price: 100 },
  { _id: "2", name: "Product B", category: "fashion", price: 50 },
  { _id: "3", name: "Product C", category: "electronics", price: 200 },
  { _id: "4", name: "Product D", category: "fashion", price: 70 },
  { _id: "5", name: "Product E", category: "home", price: 300 },
];

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const newProduct = { ...productData, _id: Date.now().toString() };
      set((prevState) => ({
        products: [...prevState.products, newProduct],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch {
      toast.error("Failed to create product");
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      set({ products: sampleData, loading: false });
    } catch {
      toast.error("Failed to fetch products");
      set({ loading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const filteredProducts = sampleData.filter(
        (product) => product.category === category
      );
      set({ products: filteredProducts, loading: false });
    } catch {
      toast.error("Failed to fetch products");
      set({ loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
      set({ loading: false });
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: !product.isFeatured }
            : product
        ),
        loading: false,
      }));
      toast.success("Product updated successfully");
    } catch {
      toast.error("Failed to update product");
      set({ loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const featuredProducts = sampleData.filter(
        (product) => product.isFeatured
      );
      set({ products: featuredProducts, loading: false });
    } catch {
      toast.error("Failed to fetch featured products");
      set({ loading: false });
    }
  },
}));
