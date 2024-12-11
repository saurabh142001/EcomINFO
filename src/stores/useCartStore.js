import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  // Adding sample data to the cart
  cart: [
    {
      _id: "1",
      name: "Sample Product 1",
      price: "$10.00",
      quantity: 1,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      name: "Sample Product 2",
      price: "$20.00",
      quantity: 2,
      imageUrl: "https://via.placeholder.com/150",
    },
  ],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  // Hardcoded coupons data
  coupons: [
    { code: "DISCOUNT10", discountPercentage: 10 }, // 10% discount
    { code: "DISCOUNT20", discountPercentage: 20 }, // 20% discount
    { code: "DISCOUNT30", discountPercentage: 30 }, // 30% discount
  ],

  getMyCoupon: async () => {
    // No API call needed, returning hardcoded coupon data
    set({ coupon: get().coupons });
  },

  applyCoupon: (code) => {
    const coupon = get().coupons.find((c) => c.code === code);
    
    if (coupon) {
      set({ coupon, isCouponApplied: true });
      get().calculateTotals(); // Recalculate totals with coupon applied
      toast.success("Coupon applied successfully");
    } else {
      toast.error("Invalid coupon code");
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals(); // Recalculate totals with coupon removed
    toast.success("Coupon removed");
  },

  getCartItems: async () => {
    // Simulating fetching cart items (no API)
    set({ cart: get().cart }); 
    get().calculateTotals();
  },

  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
  },

  addToCart: (product) => {
    const existingItem = get().cart.find((item) => item._id === product._id);

    if (existingItem) {
      set((state) => ({
        cart: state.cart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }));
    } else {
      set((state) => ({
        cart: [...state.cart, { ...product, quantity: 1 }],
      }));
    }

    get().calculateTotals(); // Recalculate totals
    toast.success("Product added to cart!");
  },

  removeFromCart: (productId) => {
    set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
    get().calculateTotals();
  },

  updateQuantity: (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    set((prevState) => ({
      cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
    }));
    get().calculateTotals();
  },

  calculateTotals: () => {
    const { cart, coupon } = get();
    let subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    // Set subtotal and total values
    set({ subtotal, total });
  },
}));
