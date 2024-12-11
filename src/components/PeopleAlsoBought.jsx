import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sample product data
    const sampleData = [
      {
        _id: "1",
        name: "Product 1",
        price: "$20",
        imageUrl: "/path/to/image1.jpg",
      },
      {
        _id: "2",
        name: "Product 2",
        price: "$30",
        imageUrl: "/path/to/image2.jpg",
      },
      {
        _id: "3",
        name: "Product 3",
        price: "$40",
        imageUrl: "/path/to/image3.jpg",
      },
    ];

    setRecommendations(sampleData);
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
