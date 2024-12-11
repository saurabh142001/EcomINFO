import { create } from "zustand";
import { toast } from "react-hot-toast";

const hardcodedUsers = [
  {
    email: "user@example.com",
    password: "password123",
    name: "John Doe",
    _id: "1",
  },
  {
    email: "alex@example.com",
    password: "alexx123",
    name: "Alex",
    _id: "2",
    
  },
  {
    email: "sj@example.com",
    password: "saurabh123",
    name: "SJ",
    _id: "3",
    
  },
];

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    // Mock signup success
    set({ user: { name, email }, loading: false });
    toast.success("Account created successfully");
  },

  login: async (email, password) => {
    set({ loading: true });

    // Find the user in the hardcoded list
    const user = hardcodedUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      set({ user, loading: false });
      toast.success(`Welcome back, ${user.name}`);
    } else {
      set({ loading: false });
      toast.error("Invalid email or password");
    }
  },

  logout: () => {
    set({ user: null });
    toast.success("Logged out successfully");
  },

  checkAuth: () => {
    const user = get().user;
    set({ checkingAuth: false });
    return user ? set({ user }) : set({ user: null });
  },

  refreshToken: () => {
  n
  },
}));
