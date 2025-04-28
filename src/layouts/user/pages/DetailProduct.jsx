import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Smile, MoreHorizontal } from 'lucide-react';

import mainImage from '../../../assets/Tenda.webp';
import mainImage1 from '../../../assets/tenda1.webp';
import mainImage2 from '../../../assets/tenda2.webp';
import RecommendedProducts from '../components/RecommendedProduct';
import Footer from '../components/footer';
const DetailProduct = ({ obat }) => {
  const [currentImage, setCurrentImage] = useState(mainImage);
  const images = [mainImage, mainImage1, mainImage2];
  const productDetailRef = useRef(null);
  const recommendedSectionRef = useRef(null);

  const changeMainImage = (newSrc) => {
    setCurrentImage(newSrc);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!productDetailRef.current || !recommendedSectionRef.current) return;
      
      const detailRect = productDetailRef.current.getBoundingClientRect();
      const recommendedRect = recommendedSectionRef.current.getBoundingClientRect();
      
      // Mendeteksi kapan detail product akan membentur recommended products
      if (detailRect.bottom >= recommendedRect.top) {
        productDetailRef.current.style.position = 'absolute';
        productDetailRef.current.style.top = 'auto';
        productDetailRef.current.style.bottom = '20px'; // Jarak dari recommended products
      } else if (window.scrollY > 10) { // Mulai 'sticky' setelah scroll 100px
        productDetailRef.current.style.position = 'sticky';
        productDetailRef.current.style.top = '52px'; // Sesuaikan dengan margin-top yang diinginkan
        productDetailRef.current.style.bottom = 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [comment, setComment] = useState('');
  const discussions = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/api/placeholder/40/40",
        isVerified: true
      },
      comment: "Does this product come in different colors? I love the design but would prefer it in black.",
      time: "2 hours ago",
      likes: 12,
      replies: [
        {
          id: 101,
          user: {
            name: "Official Store",
            avatar: "/api/placeholder/40/40",
            isVerified: true,
            isOfficial: true
          },
          comment: "Hi Sarah! Yes, we offer this in black, navy blue, and forest green. All colors are currently in stock!",
          time: "1 hour ago",
          likes: 5
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "/api/placeholder/40/40"
      },
      comment: "I purchased this last month and it's been fantastic! The quality exceeded my expectations. Highly recommended for anyone on the fence.",
      time: "1 day ago",
      likes: 24,
      replies: [
        {
          id: 201,
          user: {
            name: "Jessica Williams",
            avatar: "/api/placeholder/40/40"
          },
          comment: "Thanks for sharing your experience! Do you find it durable for everyday use?",
          time: "23 hours ago",
          likes: 3
        },
        {
          id: 202,
          user: {
            name: "Michael Chen",
            avatar: "/api/placeholder/40/40"
          },
          comment: "Absolutely! I use it daily and it still looks brand new. The materials are top-notch.",
          time: "22 hours ago",
          likes: 7
        }
      ]
    }
  ];

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // Handle submit logic would go here
    console.log("Submitted comment:", comment);
    setComment('');
  };

  return (
    <div className="mt-28">
      <a href='' className='pl-16 pb-8 underline text-teal-700 text-xl'>
        Produk -- Pakaian & Aksesoris -- Kemeja Vintage Pria
      </a>
      
      <div className="grid grid-cols-12 mx-16 mt-5">
        {/* Kolom kiri - gambar dan diskusi */}
        <div className="col-span-7 mr-4">
        <div className="grid grid-cols-12 gap-2">
              <div className="grid grid-rows-3 col-span-3 gap-4"> 
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg overflow-hidden cursor-pointer hover:shadow-lg justify-center items-center flex h-full"
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
                  alt="Product Image" 
                  className="w-auto h-full object-fill rounded-md"
                />
              </div>
            </div>
      <h2 className="text-3xl font-semibold my-6">Diskusi Produk</h2>
      {/* Comment input */}
      <div className="flex items-center gap-3 mb-8">
        <img src={mainImage} alt="User Avatar" className="w-10 h-10 rounded-full" />
        <div className="relative flex-1">
          <input 
            type="text" 
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write a comment..." 
            className="w-full border border-gray-200 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-xl" 
          />
          
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-full flex items-center gap-2 transition-colors"
        >
          <Send size={18} />
          <span className="hidden sm:inline text-lg">Send</span>
        </button>
      </div>
      
      {/* Comment counter */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-500 font-medium">
          <span className="text-gray-900 font-semibold text-xl">{discussions.length} Comments</span> 
        </div>
        <div className="flex items-center gap-2">
          <select className=" border rounded-lg px-3 py-2 bg-gray-50 text-gray-700 text-lg">
            <option>Most Recent</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {discussions.map(discussion => (
          <div key={discussion.id} className="border-b border-gray-300 pb-6">
            {/* Main comment */}
            <div className="flex gap-3">
              <img src={discussion.user.avatar} alt={discussion.user.name} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                {/* Comment header */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 text-xl">{discussion.user.name}</span>
                  
                  <span className="text-lg text-gray-500">{discussion.time}</span>
                </div>
                
                {/* Comment content */}
                <p className="text-gray-700 mb-3 text-xl">{discussion.comment}</p>
                
                {/* Comment actions */}
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  
                  <button className="flex items-center gap-1 hover:text-teal-600">
                    <MessageCircle size={20} />
                    <span className='text-lg'>Reply</span>
                  </button>
                  <button className="hover:text-gray-900">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                
                {/* Replies */}
                {discussion.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                    {discussion.replies.map(reply => (
                      <div key={reply.id} className="flex gap-3">
                        <img src={reply.user.avatar} alt={reply.user.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 text-lg">{reply.user.name}</span>
                            {reply.user.isOfficial && (
                              <span className="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded-full">Official</span>
                            )}
                            <span className=" text-gray-500">{reply.time}</span>
                          </div>
                          <p className="text-gray-700 mb-2 text-lg">{reply.comment}</p>
                          <div className="flex items-center gap-4 text-gray-500 text-sm">
                            
                            <button className="flex items-center gap-1 hover:text-teal-600">
                              <MessageCircle size={20} />
                              <span className='text-lg'>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load more button */}
      <button className="w-full mt-6 py-3 border border-gray-200 rounded-lg text-teal-600 font-medium hover:bg-gray-50 transition-colors">
        Load More Comments
      </button>
        </div>

        {/* Kolom kanan - detail produk (sticky) */}
        <div className="col-span-5">
          <div 
            ref={productDetailRef}
            className="max-w-3xl w-full pl-4 bg-white top-28 right-16" 
            style={{ position: 'sticky' }}
          >
            <div className="py-4">
              <div className='flex w-auto'>
                <div className='py-2 px-3 mr-2 bg-teal-200 rounded-2xl'>Pakaian & Aksesori</div>
              </div>
              <h1 className='mt-3 text-3xl font-bold'>Kemeja Vintage Pria</h1>
              <h1 className='mt-5 text-4xl font-bold text-teal-700'>Rp. 120.000</h1>
              <p className='mt-5 text-xl'>Kondisi : 98% Mulus</p>
              <p className='mt-5 text-xl'>Berat : 3.300 gram</p>
              <p className='mt-5 text-xl'>Garansi : 3 Bulan</p>
              <p className='mt-5 text-xl text-justify'>
                Deskripsi : Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe animi voluptatem ea cum exercitationem? 
                Incidunt tenetur a atque ut odio. Tenetur soluta deleniti cum earum provident! Provident veritatis facilis culpa! 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis eos impedit consectetur magnam aperiam reprehenderit totam nemo, quam iste unde modi iusto consequuntur. Non suscipit nemo, dolorem porro optio fuga. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni eum quisquam iure nihil labore deserunt eaque temporibus quod porro aliquid consequatur accusantium esse veniam sunt vel vero sequi, atque soluta. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro perferendis minima nostrum optio facilis numquam incidunt distinctio eum aliquid, cum, doloribus explicabo atque laboriosam. Similique ex pariatur cupiditate est molestiae.
              </p>

              <div className='flex w-full mt-10 text-center'>
                <div className='py-2 px-3 mr-2 border-2 border-teal-600 rounded-lg w-full'>Keranjang</div>
                <div className='py-2 px-3 mr-2 bg-teal-600 rounded-lg w-full'>Beli Sekarang</div>
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