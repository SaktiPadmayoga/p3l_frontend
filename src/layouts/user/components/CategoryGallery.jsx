import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import {
  TvIcon,
  ShirtIcon,
  HomeIcon,
  BookIcon,
  ToyBrickIcon,
  BabyIcon,
  CarIcon,
  FlowerIcon,
  PrinterIcon,
  SparklesIcon,
} from "lucide-react";

// Data item dan konfigurasi
const itemsData = [
    { 
      name: "Elektronik & Gadget", 
      icon: <TvIcon className="w-5 h-5" />, 
      url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80",
      description: "Smartphone, Laptop, Kamera, TV, Konsol Game",
    },
    { 
      name: "Pakaian & Aksesori", 
      icon: <ShirtIcon className="w-5 h-5" />, 
      url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80",
      description: "Pakaian, Sepatu, Tas, Perhiasan",
    },
    { 
      name: "Perabotan Rumah Tangga", 
      icon: <HomeIcon className="w-5 h-5" />, 
      url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop&q=80",
      description: "Sofa, Meja, Kursi, Lemari",
    },
    { 
      name: "Buku & Alat Tulis", 
      icon: <BookIcon className="w-5 h-5" />, 
      url: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=800&auto=format&fit=crop&q=80",
      description: "Buku Pelajaran, Komik, Alat Tulis",
    },
    { 
      name: "Hobi & Mainan", 
      icon: <ToyBrickIcon className="w-5 h-5" />, 
      url: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&auto=format&fit=crop&q=80",
      description: "Mainan Anak, Alat Musik, Barang Koleksi",
    },
    { 
      name: "Perlengkapan Bayi", 
      icon: <BabyIcon className="w-5 h-5" />, 
      url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80",
      description: "Pakaian Bayi, Stroller, Mainan Edukasi",
    },
    { 
      name: "Otomotif & Aksesori", 
      icon: <CarIcon className="w-5 h-5" />, 
      url: "https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=800&auto=format&fit=crop&q=80",
      description: "Sepeda Motor, Helm, Suku Cadang",
    },
    { 
      name: "Perlengkapan Taman", 
      icon: <FlowerIcon className="w-5 h-5" />, 
      url: "https://images.unsplash.com/photo-1536236113879-8c9f71a3af37?w=800&auto=format&fit=crop&q=80",
      description: "Peralatan Berkebun, Meja Taman, Tenda",
    },
    { 
      name: "Peralatan Kantor", 
      icon: <PrinterIcon className="w-5 h-5" />, 
      url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80",
      description: "Meja Kantor, Printer, Alat Teknik",
    },
    { 
      name: "Kosmetik & Perawatan", 
      icon: <SparklesIcon className="w-5 h-5" />, 
      url: "https://images.unsplash.com/photo-1583241819429-a1aaef8c582a?w=800&auto=format&fit=crop&q=80",
      description: "Alat Kecantikan, Parfum, Aksesori Makeup",
    },
  ];
  

const ctaCard = {
  name: "Lihat Semua Produk di ReuseMart!",
  url: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=800&auto=format&fit=crop&q=80",
  description: "Temukan berbagai barang bekas berkualitas dengan harga terjangkau.",
  cta: true,
};

// Konfigurasi kolom dengan pola tinggi berbeda
const columns = [
  [itemsData[0], itemsData[3], itemsData[4]],  // Kolom 1: 3 item
  [itemsData[1], itemsData[5], itemsData[6]], // Kolom 2: 3 item
  [itemsData[2], itemsData[7], itemsData[9]], // Kolom 3: 3 item
  [itemsData[8], ctaCard] // Kolom 4: 2 item
];

// Pola grid template rows untuk tiap kolom
const rowTemplates = [
  '1fr 2fr 1fr',   // Kolom 1: 25% 50% 25%
  '2fr 1fr 1fr',   // Kolom 2: 50% 25% 25%
  '1fr 1fr 2fr',   // Kolom 3: 25% 25% 50%
  '1fr 2fr',       // Kolom 4: 33% 67%
];

export default function CategoryGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-12 px-16 bg-gray-50" id="category-gallery" ref={ref}>
      <div className="max-w-6xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-center mb-2">Kategori Barang Bekas ReuseMart</h2>
        <p className="text-gray-600 text-center">Temukan berbagai pilihan barang bekas berkualitas</p>
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {columns.map((column, columnIndex) => (
          <div 
            key={columnIndex} 
            className="grid gap-4 h-full"
            style={{ 
              gridTemplateRows: rowTemplates[columnIndex],
              minHeight: '600px' // Sesuaikan tinggi minimum container
            }}
          >
            {column.map((item, itemIndex) => {
              const isCTA = item.cta;
              
              return (
                <motion.div 
                  key={`${columnIndex}-${itemIndex}`}
                  className="relative group overflow-hidden rounded-lg cursor-pointer h-full"
                  variants={itemVariants}
                >
                  {isCTA ? (
                    <a href="/produk" className="block w-full h-full">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 to-teal-700/60 flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-white text-xl font-bold mb-3">{item.name}</span>
                        <p className="text-white text-sm mb-5">{item.description}</p>
                        <span className="text-white text-sm font-semibold px-6 py-3 border-2 border-white rounded-full group-hover:bg-white group-hover:text-green-800 transition-colors">
                          Lihat Semua
                        </span>
                      </div>
                    </a>
                  ) : (
                    <>
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                        <div className="flex items-center gap-2 text-white">
                          {item.icon}
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <p className="text-xs text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.description}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </section>
  );
}