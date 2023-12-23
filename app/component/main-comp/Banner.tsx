import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className='relative bg-gradient-to-r from-slate-500 to-slate-700 mb-8'>
      <div className='mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly'>
        <div className='mb-8 md:mb-0 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white m-4'>
            Winter is Coming!
          </h1>
          <p className='text-lg md:text-xl text-white mb-2'>
            Enjoy our Christmas discount for your homes
          </p>
          <p className='text-2xl md:text-5xl font-bold text-red-500 '>
            Get 30% Off{" "}
            <span className='text-md md:text-lg  mb-2'>
              + 12 month Warranty
            </span>
          </p>
        </div>
        <div className=' w-1/3 relative aspect-video'>
          <Image
            src='/spencer-white-quilt-cover-set.jpg'
            alt='Banner'
            width={300}
            height={300}
            layout="responsive"
            className='object-contain'
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
