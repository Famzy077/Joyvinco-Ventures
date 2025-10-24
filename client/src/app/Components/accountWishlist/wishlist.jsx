'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import { AddToCartButton } from '@/app/Components/cart/AddToCartButton';
import { Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export const AccountWishlist = () => {
  const { wishlist, removeFromWishlist, isLoading, error } = useWishlist();
  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    toast.error(`${productName} removed from your wishlist.`);
  };

  const totalPrice = wishlist.reduce((sum, product) => sum + (product.price || 0), 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-5 min-h-[50vh]">
        <FaSpinner className="text-green-500 animate-spin" size={32}/> 
      </div>
    );
  }

  if (error) {
    return <div className="p-5 text-center text-red-500">Failed to load your wishlist. Please try again.</div>;
  }
  
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="p-5 text-center h-[85vh] flex flex-col items-center justify-center">
        <p className="mb-4 text-2xl">You have no items in your wishlist yet 💔</p>
        <Link href="/categories">
          <button className="px-6 py-2 font-semibold text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600">
            Start Exploring
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col p-5 bg-zinc-50 max-sm:px-3 rounded-xl">
        <h1 className="mb-6 text-2xl font-semibold max-sm:text-xl">Your Wishlist</h1>
        <div className="grid gap-4 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((product) => {
            if (!product) return null;

            const displayImage = product.images?.[0]?.url || '/Images/placeholder.png';

            return (
              <div key={product.id} className="relative transition-shadow duration-300 bg-white rounded-lg shadow-md group hover:shadow-lg">
                <button
                  onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                  className="absolute text-xl bg-white rounded-full p-1.5 top-2 right-2 text-red-500 z-10 shadow-sm"
                >
                  <FaHeart />
                </button>

                <Link href={`/products/${product.id}`} className="flex flex-col h-full">
                  <div className="flex flex-col flex-grow p-2">
                    <div className="flex items-center justify-center h-40">
                      <Image
                        src={displayImage}
                        height={120}
                        width={120}
                        alt={product.name}
                        className="object-contain w-auto max-h-full"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-grow mt-2 text-center">
                      <div>
                        <h1 className="text-sm font-semibold truncate">{product.name}</h1>
                        <p className="mt-1 text-base font-bold">₦{product.price.toLocaleString()}</p>
                      </div>
                      <div className="mt-2">
                        <AddToCartButton productId={product.id} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8 flex max-sm:flex-col justify-start rounded-[10px] w-auto gap-4">
          <div className='flex gap-2.5 items-center border border-green-500 w-[300px] max-sm:w-[100%] justify-center p-2 rounded-[5px]'>
            <p className="text-gray-800 text-xl max-sm:text-[1rem] font-semibold">Total Price =</p>
            <p className="text-xl max-sm:text-[0.9rem] font-bold text-gray-800">₦{totalPrice.toLocaleString()}</p>
          </div>
          <a href="tel:+2349069905126">
            <button className='text-xl w-full max-sm:text-[14px] border border-green-500 text-white rounded-[5px] bg-green-500 hover:bg-green-600 py-1.5 px-6 cursor-pointer font-semibold transition-colors flex gap-2 items-center justify-center'>
              <Phone className="max-sm:text-sm" size={28}/>
              Call to order
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};