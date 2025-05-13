import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Heart, Send, AlertCircle } from "lucide-react";
import RecommendedProducts from "../components/RecommendedProduct";
import Footer from "../components/footer";
import AuthService from "../../../services/authService";

const API_URL = "http://localhost:8000/api";

// Dummy images
const dummyImages = [
  "/src/assets/tenda.webp",
  "/src/assets/tenda1.webp",
  "/src/assets/tenda2.webp",
  
];

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(dummyImages[0]);
  const [comment, setComment] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [submittingComment, setSubmittingComment] = useState(false);
  const images = dummyImages;
  const productDetailRef = useRef(null);
  const recommendedSectionRef = useRef(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
      setUserType(AuthService.getUserType());
    };
    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  // Fetch product details and discussions
  useEffect(() => {
    const fetchProductAndDiscussions = async () => {
      try {
        setLoading(true);

        // Fetch product details
        const productResponse = await axios.get(`${API_URL}/products/${id}`);
        setProduct(productResponse.data.data);

        // Fetch discussions for the product
        const discussionsResponse = await axios.get(`${API_URL}/diskusi`, {
          params: { kode_produk: id },
        });
        setDiscussions(discussionsResponse.data);

        setCurrentImage(dummyImages[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Failed to load product or discussions. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchProductAndDiscussions();
  }, [id]);

  // Handle sticky product details
  useEffect(() => {
    const handleScroll = () => {
      if (!productDetailRef.current || !recommendedSectionRef.current) return;

      const detailRect = productDetailRef.current.getBoundingClientRect();
      const recommendedRect =
        recommendedSectionRef.current.getBoundingClientRect();

      if (detailRect.bottom >= recommendedRect.top) {
        productDetailRef.current.style.position = "absolute";
        productDetailRef.current.style.top = "auto";
        productDetailRef.current.style.bottom = "20px";
      } else if (window.scrollY > 10) {
        productDetailRef.current.style.position = "sticky";
        productDetailRef.current.style.top = "52px";
        productDetailRef.current.style.bottom = "auto";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeMainImage = (newSrc) => {
    setCurrentImage(newSrc);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    // Clear error when user starts typing
    if (commentError) setCommentError(null);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      setSubmittingComment(true);
      setCommentError(null);

      const token = localStorage.getItem("token");
      const user = AuthService.getCurrentUser();

      if (!user || !token) {
        setCommentError("You need to be logged in to comment");
        return;
      }

      const response = await axios.post(
        `${API_URL}/pembeli/diskusi`, // Changed from /diskusi to /pembeli/diskusi
        {
          ID_BALASANDISKUSI: null,
          ID_PEGAWAI: null,
          ID_PEMBELI: user.id,
          KODE_PRODUK: id,
          PESAN: comment,
          TANGGAL_DIBUAT: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add the new discussion to the list
      const newDiscussion = response.data;

      // Make sure we have the required properties for display
      newDiscussion.pembeli = {
        NAMA: user.nama || "User",
      };

      setDiscussions([...discussions, newDiscussion]);
      setComment("");

      // Scroll to the new comment
      
    } catch (err) {
      console.error("Error posting discussion:", err);
      if (err.response?.data?.error) {
        setCommentError(err.response.data.error);
      } else {
        setCommentError("Failed to post comment. Please try again.");
      }
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <div className="text-red-500 text-center py-4 font-medium text-xl">
          {error}
        </div>
        <Link
          to="/catalogue"
          className="mt-4 bg-stone-600 text-white px-6 py-2 rounded-lg hover:bg-stone-700"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertCircle size={48} className="text-amber-500 mb-4" />
        <div className="text-center py-4 font-medium text-xl">
          Product not found
        </div>
        <Link
          to="/catalogue"
          className="mt-4 bg-stone-600 text-white px-6 py-2 rounded-lg hover:bg-stone-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-28">
      <div className="pl-16 pb-8">
        <Link
          to="/catalogue"
          className="underline text-stone-700 text-md hover:text-stone-900"
        >
          Produk &gt; {product.category || "Kategori"} &gt;{" "}
          {product.name || "Produk"}
        </Link>
      </div>

      <div className=" grid grid-cols-12 mx-16">
        {/* Kolom kiri - gambar dan diskusi */}
        <div className="col-span-7 mr-4">
          <div className="grid grid-cols-12 gap-2 ">
            <div className="grid grid-rows-3 col-span-3 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden cursor-pointer hover:shadow-lg justify-center items-center h-full flex "
                  onClick={() => changeMainImage(image)}
                >
                  <img
                    src={image}
                    className="h-full object-fill"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="rounded-lg col-span-9 pl-3">
              <img
                src={currentImage}
                alt={product.name || "Product Image"}
                className="w-auto h-full object-fill rounded-md"
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold my-6">Diskusi Produk</h2>

          {/* Comment input - only visible for logged-in pembeli */}
          {isAuthenticated && userType === "pembeli" && (
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <img
                  src="/api/placeholder/40/40"
                  alt="User Avatar"
                  className="w-6 h-6 rounded-full"
                />
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Write a comment..."
                    className={`w-full border ${
                      commentError ? "border-red-500" : "border-gray-200"
                    } rounded-2xl px-4 py-2 pr-12 text-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent`}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!comment.trim() || submittingComment}
                  className="bg-olive-500 hover:bg-olive-900 text-white px-5 py-2 rounded-full flex items-center gap-2 transition-colors disabled:bg-stone-300"
                >
                  {submittingComment ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Send size={18} />
                  )}
                  <span className="hidden sm:inline text-md">Send</span>
                </button>
              </div>

              {/* Error message */}
              {commentError && (
                <div className="mt-2 text-red-500 text-sm flex items-center gap-1 pl-12">
                  <AlertCircle size={16} />
                  <span>{commentError}</span>
                </div>
              )}
            </div>
          )}

          {/* If not logged in, display login prompt */}
          {!isAuthenticated && (
            <div className="text-center p-6 bg-gray-50 rounded-lg mb-8 border border-gray-200">
              <p className="text-lg mb-3">
                Login to join the product discussion
              </p>
              <Link
                to="/login"
                className="inline-block bg-stone-600 text-white px-6 py-2 rounded-full hover:bg-stone-700 transition-colors"
              >
                Login to Comment
              </Link>
            </div>
          )}

          {/* Comment counter */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-gray-500 font-medium">
              <span className="text-gray-900 font-semibold text-lg">
                {discussions.length} Comments
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select className="border rounded-lg px-2 py-1 bg-gray-50 text-gray-700 text-md">
                <option>Most Recent</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          {/* Comments list */}
          {discussions.length > 0 ? (
            <div className="space-y-6 ml-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.ID_DISKUSI}
                  className="border-b border-gray-300 pb-6"
                >
                  {/* Main comment */}
                  <div className="flex gap-3">
                    <img
                      src="/api/placeholder/40/40"
                      alt={
                        discussion.pegawai?.NAMA ||
                        discussion.pembeli?.NAMA ||
                        "User"
                      }
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex-1">
                      {/* Comment header */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 text-sm">
                          {discussion.pegawai?.NAMA ||
                            discussion.pembeli?.NAMA ||
                            "Anonymous"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(discussion.TANGGAL_DIBUAT).toLocaleString(
                            "id-ID",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>

                      {/* Comment content */}
                      <p className="text-gray-700 mb-3 text-lg">
                        {discussion.PESAN}
                      </p>

                      {/* Employee replies */}
                      {discussion.balasan &&
                        discussion.balasan.length > 0 &&
                        discussion.balasan
                          .filter((reply) => reply.pegawai) // Only show replies from pegawai
                          .map((reply) => (
                            <div
                              key={reply.ID_DISKUSI}
                              className="mt-4 pl-4 border-l-2 border-gray-100"
                            >
                              <div className="flex gap-3">
                                <img
                                  src="/api/placeholder/40/40"
                                  alt={reply.pegawai?.NAMA || "User"}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-gray-900 text-lg">
                                      {reply.pegawai?.NAMA || "Anonymous"}
                                    </span>
                                    <span className="bg-stone-100 text-stone-800 text-xs px-2 py-0.5 rounded-full">
                                      Official
                                    </span>
                                    <span className="text-gray-500">
                                      {new Date(
                                        reply.TANGGAL_DIBUAT
                                      ).toLocaleString("id-ID", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 mb-2 text-lg">
                                    {reply.PESAN}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-gray-500 text-lg">
                No comments yet. Be the first to start the discussion!
              </p>
            </div>
          )}

          {/* Load more button - only visible if there are discussions */}
          {discussions.length > 0 && (
            <button className="w-full mt-6 py-3 border border-gray-200 rounded-lg text-stone-600 font-medium hover:bg-gray-50 transition-colors">
              Load More Comments
            </button>
          )}
        </div>

        {/* Kolom kanan - detail produk (sticky) */}
        <div className="col-span-5">
          <div
            ref={productDetailRef}
            className="max-w-3xl w-full pl-4 bg-white top-28 right-16"
            style={{ position: "sticky" }}
          >
            <div className="py-4">
              <div className="flex w-auto">
                <div className="py-2 px-3 mr-2 bg-olive-300 text-olive-500 rounded-2xl">
                  {product.category || "Kategori"}
                </div>
              </div>
              <h1 className="mt-3 text-3xl font-bold">
                {product.name || "Unknown Product"}
              </h1>
              <h1 className="mt-5 text-4xl font-bold text-stone-700">
                Rp.{" "}
                {product.price ? product.price.toLocaleString("id-ID") : "N/A"}
              </h1>
              <p className="mt-5 text-xl">
                Kondisi: {product.condition || "Tidak Diketahui"}
              </p>
              <p className="mt-5 text-xl">
                Berat:{" "}
                {product.weight ? `${product.weight} gram` : "Tidak Diketahui"}
              </p>
              <p className="mt-5 text-xl">
                Garansi:{" "}
                {product.warranty_date
                  ? new Date(product.warranty_date).toLocaleDateString("id-ID")
                  : "Tidak Ada"}
              </p>
              <p className="mt-5 text-xl text-justify">
                Deskripsi:{" "}
                {product.description || "Tidak ada deskripsi tersedia."}
              </p>

              <div className="flex w-full mt-10 text-center">
                <button className="py-2 px-3 mr-2 border-2 border-olive-500 rounded-lg w-full">
                  Keranjang
                </button>
                <button className="py-2 px-3 mr-2 bg-olive-500 text-white rounded-lg w-full">
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products Section dengan ref untuk deteksi posisi */}
      <div ref={recommendedSectionRef}>
        <RecommendedProducts />
      </div>
      <Footer />
    </div>
  );
};

export default DetailProduct;
