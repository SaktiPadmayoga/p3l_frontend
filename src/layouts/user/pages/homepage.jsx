import React from "react";
import Hero from "../../../assets/hero-bg.jpg";
import Hero2 from "../../../assets/hero-bg.png";
import CategoryGallery from "../components/CategoryGallery";
import Footer from "../components/footer";
import RecommendedProducts from "../components/RecommendedProduct";
import ThreeHorizontalCard from "../components/ThreeCard";


import HeroImageSwiper from "../components/ImageSwiper";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen">

      {/* CTA Section */}
      <header className="relative h-[90vh] bg-[url('/src/assets/hero-bg.png')] bg-cover bg-no-repeat bg-center overflow-hidden pb-5">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-olive-900 via-olive-500/80 to-olive-500/20 z-10" />

        {/* Content */}
        <div className="relative z-20 h-full flex items-center justify-between px-8">
          {/* Left side: CTA */}
          <div className="w-full flex flex-col justify-center items-center">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:flex-auto lg:py-20">
              <h2 className="text-3xl text-white sm:text-6xl">
              Temukan <span className=" font-bold">Kesempatan Baru</span>  dalam <span className=" font-bold">Barang Lama </span>             </h2>
              
              <p className="mt-6 text-lg md:text-xl text-pretty text-gray-100">
                Menjual dan membeli barang bekas kini lebih mudah dan terpercaya bersama <span className=" font-bold">Reusemart</span>             
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-olive-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Temukan Barangmu
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-8 px-20 py-12 sm:grid-cols-2 lg:grid-cols-4 bg-olive-300 justify-items-center">

        <div className="flex flex-col-reverse gap-1">
          <dt className="text-lg text-olive-900">Transaksi Berhasil</dt>
          <dd className="text-5xl font-semibold tracking-tight text-olive-500">200+</dd>
        </div>
        <div className="flex flex-col-reverse gap-1">
          <dt className="text-lg text-olive-900">Dipercaya Oleh 300+ Penitip</dt>
          <dd className="text-5xl font-semibold tracking-tight text-olive-500">300+ </dd>
        </div>
        <div className="flex flex-col-reverse gap-1">
          <dt className="text-lg text-olive-900">Barang Layak Pakai</dt>
          <dd className="text-5xl font-semibold tracking-tight text-olive-500">100%</dd>
        </div>
        <div className="flex flex-col-reverse gap-1">
          <dt className="text-lg text-olive-900"> Melalui Proses Pengecekan Ketat</dt>
          <dd className="text-5xl font-semibold tracking-tight text-olive-500">Kurasi</dd>
        </div>
      </div>
      <div className="flex flex-col px-6 md:px-16 py-20 bg-olive-50">
        <h2 className="text-3xl md:text-4xl font-bold text-olive-500 mb-12">
          Barang Terbaru dari Katalog Kami
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="col-span-1 lg:col-span-2 h-[50vh] bg-amber-100 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            
          </div>
          <div className="h-96 bg-amber-100 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"></div>
          <div className="h-96 bg-amber-100 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"></div>
        </div>
      </div>

      <div className="bg-olive-100 py-16 px-8 lg:px-40 space-y-20">
        {/* Section untuk Pembeli */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-olive-700 mb-4">
              Temukan Barang Bekas Berkualitas dengan Mudah
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Daftar sekarang sebagai pembeli dan jelajahi ribuan produk preloved yang telah dikurasi.
              Hemat lebih banyak, temukan lebih cepat.
            </p>
            <ul className="list-disc pl-10 space-y-8 mt-5 text-lg text-olive-500">
              <li>Transaksi aman dan cepat</li>
              <li>Ribuan produk terpercaya</li>
              <li>Rekomendasi personal</li>
            </ul>
            <p className="my-5 text-gray-500 text-lg">
              Bergabunglah hari ini dan mulai pengalaman belanja yang lebih bijak.
            </p>
            <Link to="/register" className="mt-16 bg-olive-500 text-white text-md px-6 py-3 rounded-lg hover:bg-olive-600 transition">
              Daftar Sebagai Pembeli
            </Link>
          </div>
          {/* Gambar */}
          <div>
            <img
              src={Hero2}
              alt="Pembeli"
              className="rounded-xl shadow-md h-[70vh] object-cover w-full justify-center"
            />
          </div>
        </div>

        {/* Section untuk Penjual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Gambar */}
          <div className="order-last lg:order-first">
            <img
              src={Hero}
              alt="Penjual"
              className="rounded-xl shadow-md h-[70vh] object-cover w-full justify-center"
            />
          </div>
          {/* Text */}
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-olive-700 mb-4">
              Jadikan Barang Lama Anda Lebih Bernilai
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Daftar sebagai penjual dan titipkan barang Anda untuk dijual dengan sistem yang praktis dan transparan.
            </p>
            <ul className="list-disc pl-10 space-y-8 mt-5 text-lg text-olive-500">
              <li>Proses titip jual mudah</li>
              <li>Dikurasi dan dipasarkan secara profesional</li>
              <li>Potensi pendapatan dari barang yang sudah tidak terpakai</li>
            </ul>
            <p className="my-5 text-gray-500 text-lg">
              Mulai sekarang dan biarkan Reusemart membantu menjual barang Anda.
            </p>
            <Link to="/about" className="mt-16 bg-olive-500 text-white text-md px-6 py-3 rounded-lg hover:bg-olive-600 transition">
              Kunjungi Gudang Kami
            </Link>
          </div>
        </div>

      </div>



    

      

      <CategoryGallery />


      {/* CTA Section */}
      {/* <section className=" h-[90vh] flex items-center justify-between mx-16 rounded-2xl overflow-hidden">
        <div className="w-1/2 h-full">
          <HeroImageSwiper />
        </div>
        <div className="w-1/2 flex flex-col justify-center px-8 items-center">
          <div class="mx-auto max-w-lg text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 class="text-3sxl font-semibold tracking-tight text-balance  sm:text-5xl">Boost your productivity. Start using our app today.</h2>
            <p class="mt-6 text-lg/8 text-pretty text-gray-700">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.</p>
            <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a href="#" class="rounded-md bg-stone-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get started</a>
              <a href="#" class="text-sm/6 font-semibold ">Learn more <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>       
      </section> */}

      <ThreeHorizontalCard />

      <RecommendedProducts />


      {/* Popular Products */}
      <section className="py-10 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Popular Products</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <img src="https://source.unsplash.com/300x200/?product" alt="Product" className="w-full rounded-lg" />
              <h3 className="mt-4 text-lg font-semibold">Product {item}</h3>
              <p className="text-blue-600 font-bold mt-2">$99.99</p>
              <a href="/detail-product" className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full">Add to Cart</a>
            </div>
          ))}
        </div>
      </section>

      {/* <h2 className="text-3xl font-semibold text-center text-gray-800">Shop by Category</h2> */}
      




      <Footer />
    </div>
  );
};

export default HomePage;
