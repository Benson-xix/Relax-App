"use client";

import Button from "@/app/component/Button";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/Utils/formatPrice";
import { SafeUser } from "@/types";
import CheckOutClient from "@/app/checkout/component/CheckOutClient";
import { useRouter } from "next/navigation";

interface CartClient {
  currentUser: SafeUser | null
}

const CartClient: React.FC<CartClient> = ({currentUser}) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className='flex flex-col items-center '>
        <div className='text-2xl'>Your Cart is empty change that</div>

        <Link href={"/"} className='text-rose-500 flex items-center mt-2 gap-1'>
          <MdArrowBack />
          <span>Start Your Purchase</span>
        </Link>
      </div>
    );
  }

  return (
    <div className='bg-slate-500 p-2 '>
      <h1 className='text-3xl text-yellow-400 flex justify-center'>
        Cart Section
      </h1>

      <div className='grid grid-cols-5 text-xs md:text-sm text-white gap-4 mt-8  pb-2 items-center'>
        <div className='col-span-2 justify-self-start'>PRODUCT</div>
        <div className='justify-self-center'>PRICE</div>
        <div className='justify-self-center'>QUANTITY</div>
        <div className='justify-self-end'>TOTAL</div>
      </div>

      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item}/>;
          })}
      </div>

      <div className='border-t-[1.5px] border-yellow-400 py-4 flex justify-between gap-4'>
        <div className='w-[120px]'>
          <Button label='Clear Cart Out' onClick={() => {handleClearCart()}} small  outline />
        </div>

        <div className='text-sm  flex flex-col gap-1 items-start'>
          <div className="flex justify-between w-full text-base text-white font-semibold">
            <span>SubTotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-rose-300 text-base ">Taxes and shipping fee will be checked at Checkout</p>

          <Button label={currentUser ? 'CheckOut' : 'Login/Register to Checkout' } onClick={() => {currentUser ? router.push("/checkout") : router.push("/login")}} />
          <Link href={"/"} className='text-rose-500 flex items-center mt-2 gap-1'>
          <MdArrowBack />
          <span>Return to  Add more to your cart</span>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
