import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function RecommendedProducts() {

    const sliderRef = useRef(null);

const scrollLeft = () => {
  sliderRef.current.scrollBy({ left: -500, behavior: 'smooth' });
};

const scrollRight = () => {
  sliderRef.current.scrollBy({ left: 500, behavior: 'smooth' });
};
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
  return (
    <div className="mb-5 m-16">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-medium">Explore our recomendations</h2>
              <div className="flex space-x-2">
                <button onClick={scrollLeft} className=""><ChevronLeft size={36} /></button>
                <button onClick={scrollRight} className=""><ChevronRight size={36} /></button>
              </div>
            </div>
            <div ref={sliderRef}
    className=" overflow-x-auto scrollbar-hide scroll-smooth">
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
  );
}