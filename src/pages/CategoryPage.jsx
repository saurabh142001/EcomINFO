import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore"; // Import the useCartStore
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();

  const { cart, addToCart } = useCartStore((state) => ({
    cart: state.cart,
    addToCart: state.addToCart,
  }));

  const products = [
    {
      _id: "1",
      name: "Product 1",
      description: "This is a description of Product 1.",
      price: "$10.00",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      name: "Product 2",
      description: "This is a description of Product 2.",
      price: "$20.00",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "3",
      name: "Product 3",
      description: "This is a description of Product 3.",
      price: "$30.00",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "4",
      name: "Product 4",
      description: "This is a description of Product 4.",
      price: "$40.00",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {}, [category]);

  // Function to handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart through Zustand store
  };

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
              No products found
            </h2>
          )}

          {products?.map((product) => (
            <ProductCard key={product._id} product={product}>
              <button
                className="bg-emerald-400 text-white px-4 py-2 rounded-lg"
                onClick={() => handleAddToCart(product)} // Add to cart button
              >
                Add to Cart
              </button>
            </ProductCard>
          ))}
        </motion.div>

        {/* Display cart item count (for dynamic cart update) */}
        <div className="fixed bottom-4 right-4 bg-emerald-400 text-white px-6 py-2 rounded-full">
          Cart ({cart.length})
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
