import React from "react";
import Hero from "../../../assets/hero-bg.jpg";
import CategoryGallery from "../components/category-gallery";


import HeroImageSwiper from "./../components/hero-image-swiper";

const HomePage = () => {
  return (
    <div className="min-h-screen mt-20">

      {/* CTA Section */}
      <header className="relative h-[89vh] bg-[url('/src/assets/hero-bg.jpg')] bg-cover bg-no-repeat bg-center mx-7 rounded-2xl overflow-hidden mb-32 pb-5">
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/0 z-10" />

  {/* Content */}
  <div className="relative z-20 h-full flex items-center justify-between px-8">
    {/* Left side: CTA */}
    <div className="w-1/2 flex flex-col justify-center items-center">
      <div className="mx-auto max-w-lg text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-6xl">
          Boost your productivity. Start using our app today.
        </h2>
        <p className="mt-6 text-lg/8 text-pretty text-gray-700">
          Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
          <a
            href="#"
            className="rounded-md bg-teal-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get started
          </a>
          <a href="#" className="text-sm/6 font-semibold">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
      </header>


      {/* CTA Section */}
      <section className=" h-[90vh] flex items-center justify-between mx-7 rounded-2xl overflow-hidden">
        <div className="w-1/2 h-full">
          <HeroImageSwiper />
        </div>
        <div className="w-1/2 flex flex-col justify-center px-8 items-center">
        <svg viewBox="0 0 1024 1024" class="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
          <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stop-color="#333444" />
              <stop offset="1" stop-color="#333888" />
            </radialGradient>
          </defs>
        </svg>
        <div class="mx-auto max-w-lg text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 class="text-3sxl font-semibold tracking-tight text-balance  sm:text-6xl">Boost your productivity. Start using our app today.</h2>
          <p class="mt-6 text-lg/8 text-pretty text-gray-700">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.</p>
          <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <a href="#" class="rounded-md bg-teal-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get started</a>
            <a href="#" class="text-sm/6 font-semibold ">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
        </div>       
      </section>


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

      <h2 className="text-3xl font-semibold text-center text-gray-800">Shop by Category</h2>
      <CategoryGallery />




      {/* Footer */}
      {/* <footer className="mt-10 bg-gray-800 text-white py-6 text-center">
        <p>© 2025 ShopMart. All Rights Reserved.</p>
      </footer> */}
    </div>
  );
};

export default HomePage;
