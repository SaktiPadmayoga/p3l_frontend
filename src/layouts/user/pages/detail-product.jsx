

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Heart, Share2 } from 'lucide-react';
import mainImage from '../../../assets/Tenda.webp';
import mainImage1 from '../../../assets/tenda1.webp';
import mainImage2 from '../../../assets/tenda2.webp';
import mainImage3 from '../../../assets/tenda3.webp';
import bg from "../../../assets/BgFix.png";

const DetailProduct = ({ obat }) => {
  

  const [currentImage, setCurrentImage] = useState(mainImage);

  const images = [mainImage, mainImage1, mainImage2, mainImage3];

  const changeMainImage = (newSrc) => {
    setCurrentImage(newSrc);
  };

  return (
    <div className="mx-5 mt-15 h-screen">
    <a href='' className='pl-4 pb-4 underline text-teal-700'>Produk -- Pakaian & Aksesoris -- Kemeja Vintage Pria</a>
      <div className="grid grid-cols-12">
        <div className="col-span-7">
          <div className="p-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="grid grid-rows-4 col-span-2 gap-4 bg-gray-50">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => changeMainImage(image)}
                  >
                    <img 
                      src={image} 
                      className="w-full" 
                      alt={`Thumbnail ${index + 1}`} 
                    />
                  </div>
                ))}
              </div>
              <div className="rounded-lg overflow-hidden col-span-10 max-h-[70vh] pr-5 pl-4 pb-5">
                <img 
                  src={currentImage} 
                  alt="Product Image" 
                  className="w-full object-fill"
                />
              </div>
            </div>
            
          </div>
        </div>
        <div className="col-span-5 fixed-top">
          <div className=" py-4">
            <div className='flex w-auto'>
                <div className='py-2 px-3 mr-2 bg-teal-200 rounded-2xl'>Pakaian & Aksesori</div>
            </div>
            <h1 className='mt-3 text-3xl font-bold'>Kemeja Vintage Pria</h1>
            <h1 className='mt-5 text-4xl font-bold text-teal-700 '>Rp. 120.000</h1>
            <p className='mt-5 text-xl'>Kondisi     : 98% Mulus</p>
            <p className='mt-5 text-xl'>Berat       : 3.300 gram</p>
            <p className='mt-5 text-xl'>Deskripsi   : Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe animi voluptatem ea cum exercitationem? Incidunt tenetur a atque ut odio. Tenetur soluta deleniti cum earum provident! Provident veritatis facilis culpa!</p>

            <div className='flex w-full mt-10 text-center'>
                <div className='py-2 px-3 mr-2 border-2 border-teal-600 rounded-lg w-full'>Keranjang</div>
                <div className='py-2 px-3 mr-2 bg-teal-600 rounded-lg w-full'>Beli Sekarang</div>
            </div>
            
            

            

        
            {/* Social Interaction Buttons */}
            {/* <div className="flex justify-center gap-6 mt-4">
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                <MessageCircle size={20} />
                Chat
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                <Heart size={20} />
                Wishlist
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                <Share2 size={20} />
                Share
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;