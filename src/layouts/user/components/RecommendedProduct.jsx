import { useState, useEffect } from "react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/authService";

const API_URL = "http://localhost:8000/api";

export default function RecommendedProducts() {
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsResponse = await axios.get(`${API_URL}/products`);
        setProducts(productsResponse.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          "Failed to load recommended products. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  // Handle product click to navigate to detail page
  const handleProductClick = (productId) => {
    navigate(`/detail-product/${productId}`);
  };

  // Handle Add to Cart click
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating to detail page
    if (!AuthService.isAuthenticated()) {
      navigate("/login", {
        state: { message: "Login terlebih dahulu sebagai pembeli" },
      });
    }
    // For pembeli, the button is disabled, so no action is needed here
  };

  const ProductCard = ({ product }) => {
    const userType = AuthService.getUserType() || "";
    const isAuthenticated = AuthService.isAuthenticated();
    const showAddToCart = userType !== "penitip"; // Hide for penitip
    const isPembeli = userType === "pembeli";

    // Select main image (IS_UTAMA = true)
    const mainImage =
      product.photos?.find((photo) => photo.is_utama)?.url ||
      product.image ||
      "/api/placeholder/60/60";

    return (
      <div
        className="bg-white rounded-xl hover:shadow-xl overflow-hidden cursor-pointer hover:-translate-y-1 p-4 transition duration-300"
        onClick={() => handleProductClick(product.id)}
      >
        <div className="flex justify-center">
          <img
            src={mainImage}
            alt={product.name || "Product"}
            className="object-cover w-72 h-52 rounded-lg"
            onError={(e) => (e.target.src = "/api/placeholder/60/60")}
          />
        </div>
        <div className="pt-4">
          <h3 className="text-lg font-semibold">
            {product.name || "Unknown Product"}
          </h3>
          <p className="text-sm text-gray-500">
            {product.subcategory || "Unknown"}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-2xl text-stone-800">
              Rp {product.price ? product.price.toLocaleString("id-ID") : "N/A"}
            </span>
            {showAddToCart && (
              <div className="flex space-x-2">
                <button
                  className={`px-2 py-1 rounded text-sm ${
                    isPembeli
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-stone-600 text-white hover:bg-stone-700"
                  }`}
                  onClick={handleAddToCart}
                  disabled={isPembeli}
                  title={
                    isPembeli ? "Cart functionality coming soon" : "Add to Cart"
                  }
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-5 m-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-medium">Explore our recommendations</h2>
        <div className="flex space-x-2">
          <button onClick={scrollLeft} className="">
            <ChevronLeft size={36} />
          </button>
          <button onClick={scrollRight} className="">
            <ChevronRight size={36} />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-8">
          <svg
            className="animate-spin h-8 w-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <div className="text-red-500 py-4">{error}</div>
      ) : (
        <div
          ref={sliderRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div className="flex space-x-4 w-max">
            {products.slice(0, 10).map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 h-80 w-full rounded-lg mb-10"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
