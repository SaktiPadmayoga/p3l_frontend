import { useState } from 'react';
import { 
    Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
    Smartphone, ShoppingBag, Home, BookOpen, Gamepad2, Baby,
    Car, Tent, Briefcase, Scissors
  } from 'lucide-react';
import Footer from '../components/footer';
export default function Catalogue() {
  const [activePage, setActivePage] = useState(1);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  
  const products = [
    {
      id: 1,
      name: 'Phone Holder Sukti',
      category: 'Other',
      price: 29.90,
      rating: 4.5,
      reviews: 124,
      image: '/src/assets/hero-bg.jpg',
    },
    {
      id: 2,
      name: 'Headsound',
      category: 'Music',
      price: 12.00,
      rating: 4.7,
      reviews: 120,
      image: '/src/assets/tenda.webp',
    },
    {
      id: 3,
      name: 'Acloku Cleaner',
      category: 'Other',
      price: 29.90,
      rating: 4.8,
      reviews: 110,
      image: '/src/assets/tenda1.webp',
    },
    {
      id: 4,
      name: 'CCTV Mafing',
      category: 'Home',
      price: 50.00,
      rating: 4.9,
      reviews: 133,
      image: '/src/assets/tenda2.webp',
    },
    {
      id: 5,
      name: 'Stuffus Peker 32',
      category: 'Other',
      price: 9.90,
      rating: 4.2,
      reviews: 134,
      image: '/src/assets/tenda3.webp',
    },
    {
      id: 6,
      name: 'Stuffus R175',
      category: 'Music',
      price: 34.10,
      rating: 4.3,
      reviews: 140,
      image: '/src/assets/tenda.webp',
    },
    {
        id: 1,
        name: 'Phone Holder Sukti',
        category: 'Other',
        price: 29.90,
        rating: 4.5,
        reviews: 124,
        image: '/src/assets/hero-bg.jpg',
      },
      {
        id: 2,
        name: 'Headsound',
        category: 'Music',
        price: 12.00,
        rating: 4.7,
        reviews: 120,
        image: '/src/assets/tenda.webp',
      },
      {
        id: 3,
        name: 'Acloku Cleaner',
        category: 'Other',
        price: 29.90,
        rating: 4.8,
        reviews: 110,
        image: '/src/assets/tenda1.webp',
      },
      {
        id: 4,
        name: 'CCTV Mafing',
        category: 'Home',
        price: 50.00,
        rating: 4.9,
        reviews: 133,
        image: '/src/assets/tenda2.webp',
      },
      {
        id: 5,
        name: 'Stuffus Peker 32',
        category: 'Other',
        price: 9.90,
        rating: 4.2,
        reviews: 134,
        image: '/src/assets/tenda3.webp',
      },
      {
        id: 6,
        name: 'Stuffus R175',
        category: 'Music',
        price: 34.10,
        rating: 4.3,
        reviews: 140,
        image: '/src/assets/tenda.webp',
      },
      {
        id: 3,
        name: 'Acloku Cleaner',
        category: 'Other',
        price: 29.90,
        rating: 4.8,
        reviews: 110,
        image: '/src/assets/tenda1.webp',
      },
      {
        id: 4,
        name: 'CCTV Mafing',
        category: 'Home',
        price: 50.00,
        rating: 4.9,
        reviews: 133,
        image: '/src/assets/tenda2.webp',
      },
      {
        id: 5,
        name: 'Stuffus Peker 32',
        category: 'Other',
        price: 9.90,
        rating: 4.2,
        reviews: 134,
        image: '/src/assets/tenda3.webp',
      },
      {
        id: 6,
        name: 'Stuffus R175',
        category: 'Music',
        price: 34.10,
        rating: 4.3,
        reviews: 140,
        image: '/src/assets/tenda.webp',
      },
  ];

  const recommendedProducts = [
    {
      id: 7,
      name: 'TWS Bujuu',
      category: 'Music',
      price: 29.90,
      rating: 4.1,
      reviews: 88,
      image: '/src/assets/tenda.webp',
    },
    {
      id: 8,
      name: 'Headsound Beptic',
      category: 'Music',
      price: 12.00,
      rating: 4.6,
      reviews: 90,
      image: '/src/assets/tenda1.webp',
    },
    {
      id: 9,
      name: 'Acloku Cleaner',
      category: 'Other',
      price: 29.90,
      rating: 4.8,
      reviews: 110,
      image: '/src/assets/tenda.webp',
    },
    {
        id: 10,
        name: 'TWS Bujuu',
        category: 'Music',
        price: 29.90,
        rating: 4.1,
        reviews: 88,
        image: '/src/assets/tenda.webp',
      },
      {
        id: 11,
        name: 'Headsound Beptic',
        category: 'Music',
        price: 12.00,
        rating: 4.6,
        reviews: 90,
        image: '/src/assets/tenda1.webp',
      },
  ];

  const categories = [
    { 
      id: 1, 
      name: 'Elektronik & Gadget',
      icon: <Smartphone size={20} />,
      subcategories: ['Smartphone', 'Laptop', 'Kamera', 'TV', 'Konsol Game']
    },
    { 
      id: 2, 
      name: 'Pakaian & Aksesori',
      icon: <ShoppingBag size={20} />,
      subcategories: ['Pakaian', 'Sepatu', 'Tas', 'Perhiasan']
    },
    { 
      id: 3, 
      name: 'Perabotan Rumah Tangga',
      icon: <Home size={20} />,
      subcategories: ['Sofa', 'Meja', 'Kursi', 'Lemari']
    },
    { 
      id: 4, 
      name: 'Buku, Alat Tulis, & Peralatan Sekolah',
      icon: <BookOpen size={20} />,
      subcategories: ['Buku Pelajaran', 'Komik', 'Alat Tulis']
    },
    { 
      id: 5, 
      name: 'Hobi, Mainan, & Koleksi',
      icon: <Gamepad2 size={20} />,
      subcategories: ['Mainan Anak', 'Alat Musik', 'Barang Koleksi']
    },
    { 
      id: 6, 
      name: 'Perlengkapan Bayi & Anak',
      icon: <Baby size={20} />,
      subcategories: ['Pakaian Bayi', 'Stroller', 'Mainan Edukasi']
    },
    { 
      id: 7, 
      name: 'Otomotif & Aksesori',
      icon: <Car size={20} />,
      subcategories: ['Sepeda Motor', 'Helm', 'Suku Cadang']
    },
    { 
      id: 8, 
      name: 'Perlengkapan Taman & Outdoor',
      icon: <Tent size={20} />,
      subcategories: ['Peralatan Berkebun', 'Meja Taman', 'Tenda']
    },
    { 
      id: 9, 
      name: 'Peralatan Kantor & Industri',
      icon: <Briefcase size={20} />,
      subcategories: ['Meja Kantor', 'Printer', 'Alat Teknik']
    },
    { 
      id: 10, 
      name: 'Kosmetik & Perawatan Diri',
      icon: <Scissors size={20} />,
      subcategories: ['Skincare', 'Makeup', 'Perawatan Rambut', 'Parfum']
    },
  ];

  const toggleCategory = (categoryId) => {
    if (openCategoryId === categoryId) {
      setOpenCategoryId(null);
    } else {
      setOpenCategoryId(categoryId);
    }
  };


  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl hover:shadow-xl overflow-hidden cursor-pointer hover:-translate-y-1 p-4 transition duration-300 ">
      <div className="flex justify-center">
        <img src={product.image} alt={product.name} className="h-64 w-full object-cover rounded-lg" />
      </div>
      <div className='pt-4'>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-2xl text-stone-800">${product.price.toFixed(2)}</span>
            <div className="flex space-x-2">
            <button className="bg-gray-100  text-stone-800 px-2 py-1 rounded">Add to Cart</button>            
            </div>
        </div>
      </div>
      
    </div>
  );

  const [appliedFilters, setAppliedFilters] = useState([
    { id: 1, category: 'Elektronik & Gadget', subcategory: 'Smartphone' },
    { id: 2, category: 'Pakaian & Aksesori', subcategory: 'Tas' },
    { id: 3, category: 'Hobi, Mainan, & Koleksi', subcategory: 'Alat Musik' }
  ]);

  const removeFilter = (filterId) => {
    setAppliedFilters(appliedFilters.filter(filter => filter.id !== filterId));
  };

  const clearAllFilters = () => {
    setAppliedFilters([]);
  };

  if (appliedFilters.length === 0) {
    return null;
  }

  const AppliedFilters = ({ appliedFilters, clearAllFilters }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-3xl font-medium mb-4">Applied Filters</h3>
        <button 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={clearAllFilters}
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {appliedFilters.map(filter => (
          <div 
            key={filter.id} 
            className="bg-gray-100 text-sm px-2 py-1 rounded"
          >
            {`${filter.subcategory}`}
          </div>
        ))}
      </div>
    </div>
  );
  


  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-96 w-full bg-[url('/src/assets/hero-bg.jpg')]  bg-cover bg-no-repeat bg-center overflow-hidden">
        <div className="absolute inset-0 flex-row items-center bg-gradient-to-t from-stone-900/90 to-stone-700/40">
          <div>
            <h1 className=" mt-60 text-9xl justify-center text-center font-bold text-white ">Catalog Produk</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col mx-16 -mt-12 z-10 relative bg-white rounded-2xl p-5">
        {/* <div className='flex flex-row items-center justify-between mb-10'>
            <h2 className="text-4xl font-bold mb-4">Temukan berbagai kebutuhanmu</h2>
            <div className="flex items-center border border-gray-300 rounded-full p-1">
              <input type="text" placeholder="Search..." className="flex-1 px-32 py-2 rounded-full" />
              <button className="bg-stone-800 text-white px-4 py-2 rounded-full">
                <Search size={32} />
              </button>
            </div>
        </div> */}
        <div className="flex gap-9">
            {/* Sidebar */}
            <div className="w-72 flex-shrink-0">
                <AppliedFilters 
                appliedFilters={appliedFilters} 
                clearAllFilters={clearAllFilters} 
                />
                <h2 className="font-medium mb-4 mt-8 text-3xl">Category</h2>
                <ul className="space-y-4">
                    {categories.map(category => (
                    <li key={category.id} className="text-md">
                        <div 
                        className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleCategory(category.id)}
                        >
                        <div className="flex items-center">
                            <span className="mr-3 text-gray-600">{category.icon}</span>
                            <span className="font-medium">{category.name}</span>
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
                                <input type="checkbox" className="mr-2" />
                                <span className="text-gray-700">{subcat}</span>
                            </li>
                            ))}
                        </ul>
                        )}
                    </li>
                    ))}
                </ul>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-8">
                    {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center space-x-2 mt-14">
                    
                    <button className="flex flex-row text-lg ml-2">
                        <ChevronLeft size={28} />
                        <p>Previous</p>
                    </button>
                    <div>
                    {[1, 2, 3, 4, 5, 6,'...', 10].map(page => (
                    <button 
                        key={page} 
                        className={` w-10 h-10 flex-row items-center justify-center rounded space-x-2 ${
                        activePage === page ? 'bg-black text-white' : 'text-gray-600'
                        }`}
                        onClick={() => setActivePage(page)}
                    >
                        {page}
                    </button>
                    ))}
                    </div>
                    

                    <button className="flex flex-row text-lg mr-4">
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
              <h2 className="text-4xl font-medium">Explore our recomendations</h2>
              <div className="flex space-x-2">
                <button className=""><ChevronLeft size={36} /></button>
                <button className=""><ChevronRight size={36} /></button>
              </div>
            </div>
            <div className="overflow-x-auto ">
                <div className="flex space-x-4 w-max">
                    {recommendedProducts.map(product => (
                    <div
                        
                        className="flex-shrink-0 w-lg h-xl rounded-lg mb-10"
                    >
                        <ProductCard key={product.id} product={product} />
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
                type="email" 
                placeholder="Your Email" 
                className="bg-white text-gray-900 px-4 py-2 rounded-l"
              />
              <button className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-r text-sm">Send</button>
            </div>
            
            <div className="flex justify-end mt-4">
              <div className="w-48">
                <p className="text-sm">Stuffus for Home and Music</p>
                <p className="text-xs text-gray-400 mt-1">We'll keep by your needs, identify the best option for you. Every order comes a shipment smart kit charging solutions.</p>
              </div>
            </div>
          </div>
      <Footer />
    </div>
  );
}