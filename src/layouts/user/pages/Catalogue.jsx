import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Smartphone,
  ShoppingBag,
  Home,
  BookOpen,
  Gamepad2,
  Baby,
  Car,
  Tent,
  Briefcase,
  Scissors,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/authService";
import Footer from "../components/footer";

// Map category IDs to icons
const categoryIcons = {
  1: <Smartphone size={20} />,
  2: <ShoppingBag size={20} />,
  3: <Home size={20} />,
  4: <BookOpen size={20} />,
  5: <Gamepad2 size={20} />,
  6: <Baby size={20} />,
  7: <Car size={20} />,
  8: <Tent size={20} />,
  9: <Briefcase size={20} />,
  10: <Scissors size={20} />,
};

const API_URL = "http://localhost:8000/api";

// Dummy images from previous hardcoded products
const dummyImages = [
  "/src/assets/hero-bg.jpg",
  "/src/assets/tenda.webp",
  "/src/assets/tenda1.webp",
  "/src/assets/tenda2.webp",
  "/src/assets/tenda3.webp",
];

export default function Catalogue() {
  const [activePage, setActivePage] = useState(1);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productsError, setProductsError] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const productsPerPage = 15;
  const navigate = useNavigate();

  // Fetch categories, subcategories, and products
  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const [categoriesResponse, subcategoriesResponse] = await Promise.all([
          axios.get(`${API_URL}/categories`),
          axios.get(`${API_URL}/subcategories`),
        ]);

        const categoriesData = categoriesResponse.data.data.map((category) => ({
          id: category.ID_KATEGORI,
          name: category.NAMA,
          icon: categoryIcons[category.ID_KATEGORI] || (
            <ShoppingBag size={20} />
          ),
          subcategories: subcategoriesResponse.data.data
            .filter((sub) => sub.ID_KATEGORI === category.ID_KATEGORI)
            .map((sub) => sub.NAMASUB),
        }));

        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching categories/subcategories:", err);
        setError("Failed to load categories. Please try again later.");
      }
    };

    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get(`${API_URL}/products`);
        // Use the image field directly from the API response
        setProducts(productsResponse.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProductsError("Failed to load products. Please try again later.");
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCategoriesAndSubcategories(), fetchProducts()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleCategory = (categoryId) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  const toggleSubcategorySelection = (subcategory) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((sub) => sub !== subcategory)
        : [...prev, subcategory]
    );
  };

  const clearAllFilters = () => {
    setSelectedSubcategories([]);
  };

  // Handle Add to Cart click
  const handleAddToCart = () => {
    if (!AuthService.isAuthenticated()) {
      navigate("/login", {
        state: { message: "Login terlebih dahulu sebagai pembeli" },
      });
    }
    // For pembeli, the button is disabled, so no action is needed here
  };

  // Handle product click to navigate to detail page
  const handleProductClick = (productId) => {
    navigate(`/detail-product/${productId}`);
  };

  // Filter products based on selected subcategories
  const filteredProducts = selectedSubcategories.length
    ? products.filter((product) =>
        selectedSubcategories.includes(product.subcategory)
      )
    : products;

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (activePage - 1) * productsPerPage,
    activePage * productsPerPage
  );

  const handlePrevious = () => {
    if (activePage > 1) setActivePage(activePage - 1);
  };

  const handleNext = () => {
    if (activePage < totalPages) setActivePage(activePage + 1);
  };

  const ProductCard = ({ product }) => {
    const userType = AuthService.getUserType() || "";
    const isAuthenticated = AuthService.isAuthenticated();
    const isPembeli = userType === "pembeli";
  
    return (
      <div
        className="bg-white rounded-xl hover:shadow-xl overflow-hidden cursor-pointer hover:-translate-y-1 p-4 transition duration-300"
        onClick={() => handleProductClick(product.id)}
      >
        <div className="flex justify-center">
          <img
            src={product.image || "/api/placeholder/60/60"}
            alt={product.name || "Product"}
            className="h-64 w-full object-cover rounded-lg"
            onError={(e) => (e.target.src = "/api/placeholder/60/60")} // Fallback for broken images
          />
        </div>
        <div className="pt-2">
          <h3 className="text-lg font-semibold">
            {product.name || "Unknown Product"}
          </h3>
          <p className="text-xs text-gray-400">
            {product.subcategory || "Unknown"}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-2xl text-stone-800">
              Rp {product.price ? product.price.toLocaleString("id-ID") : "N/A"}
            </span>
            {userType !== "penitip" && (
              <div className="relative flex space-x-2">
                <button
                  className={`px-2 py-1 rounded text-sm ${
                    isPembeli
                      ? "bg-gray-300 text-gray-500"
                      : "bg-stone-600 text-white hover:bg-stone-700 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  disabled={isPembeli}
                  title={isPembeli ? "Cart functionality coming soon" : "Add to Cart"}
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

  const AppliedFilters = ({ selectedSubcategories, clearAllFilters }) => {
    if (selectedSubcategories.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-3xl font-medium text-olive-500 mb-4">Applied Filters</h3>
          <button
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedSubcategories.map((subcategory, index) => (
            <div
              key={index}
              className="bg-gray-100 text-sm px-2 py-1 rounded flex items-center"
            >
              {subcategory}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => toggleSubcategorySelection(subcategory)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-96 w-full bg-[url('/src/assets/hero-bg.png')] bg-cover bg-no-repeat bg-center overflow-hidden">
        <div className="absolute inset-0 flex-row items-center bg-gradient-to-t from-olive-900/90 to-olive-500/40">
          <div>
            <h1 className="mt-60 text-9xl justify-center text-center font-bold text-white">
              Katalog Produk
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col mx-16 -mt-12 z-10 relative bg-white rounded-2xl p-5">
        <div className="flex gap-9">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <AppliedFilters
              selectedSubcategories={selectedSubcategories}
              clearAllFilters={clearAllFilters}
            />
            <h2 className="font-medium mb-4 text-3xl text-olive-500">Category</h2>
            {loading ? (
              <div className="flex justify-center py-4">
                <svg
                  className="animate-spin h-5 w-5 text-gray-600"
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
              <ul className="space-y-5">
                {categories.map((category) => (
                  <li key={category.id} className="text-sm">
                    <div
                      className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-600">
                          {category.icon}
                        </span>
                        <span className="font-medium mr-2">{category.name}</span>
                      </div>
                      {openCategoryId === category.id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>

                    {openCategoryId === category.id && (
                      <ul className="pl-4 mt-1 mb-2 space-y-1">
                        {category.subcategories.map((subcat, idx) => (
                          <li key={idx} className="flex items-center py-1">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={selectedSubcategories.includes(subcat)}
                              onChange={() =>
                                toggleSubcategorySelection(subcat)
                              }
                            />
                            <span className="text-gray-700">{subcat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {productsError && (
              <div className="text-red-500 py-4">{productsError}</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2 mb-8">
              {paginatedProducts.length ? (
                paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-5 text-center py-4">
                  No products found for selected filters.
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center space-x-2 mt-14">
              <button
                className="flex flex-row text-lg ml-2 disabled:opacity-50"
                onClick={handlePrevious}
                disabled={activePage === 1}
              >
                <ChevronLeft size={28} />
                <p>Previous</p>
              </button>
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 flex items-center justify-center rounded ${
                        activePage === page
                          ? "bg-olive-900 text-white"
                          : "text-olive-500 hover:bg-olive-900"
                      }`}
                      onClick={() => setActivePage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                className="flex flex-row text-lg mr-4 disabled:opacity-50"
                onClick={handleNext}
                disabled={activePage === totalPages}
              >
                <p>Next</p>
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-5 m-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-medium">Explore our recommendations</h2>
          <div className="flex space-x-2">
            <button>
              <ChevronLeft size={36} />
            </button>
            <button>
              <ChevronRight size={36} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 w-max">
            {products.slice(0, 10).map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-64 h-auto rounded-lg mb-10"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-stone-900 text-white p-8 m-16 rounded-2xl">
        <h2 className="text-2xl font-bold mb-1">Ready to Get</h2>
        <h2 className="text-2xl font-bold">Our New Stuff?</h2>
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Your Email"
            className="bg-white text-gray-900 px-4 py-2 rounded-l"
          />
          <button className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-r text-sm">
            Send
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <div className="w-48">
            <p className="text-sm">Stuffus for Home and Music</p>
            <p className="text-xs text-gray-400 mt-1">
              We'll keep by your needs, identify the best option for you. Every
              order comes a shipment smart kit charging solutions.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
