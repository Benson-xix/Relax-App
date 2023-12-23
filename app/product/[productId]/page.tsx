import ContainerMain from "@/app/component/ContainerMain";
import Header from "@/app/component/Header";
import Footer from "@/app/component/footer/Footer";
import React from "react";
import ProductDetails from "./ProductDetails";

import ListRating from "./ListRating";

import getProductById from "@/action/getProductById";
import NullData from "@/app/component/NullData";
import { getCurrentUser } from "@/action/getCurrentUser";
import AddRating from "./AddRating";



interface IParams {
  productId: string;
}

const page = async  ({ params }: { params: IParams }) => {

  const product = await getProductById(params);
  const user = await getCurrentUser()


  if(!product) return <NullData title="Oops product with an assigned Id doesnot exist"/>


  return (
    <div className='flex min-h-screen  flex-col  bg-slate-400 gap-3   '>
      <Header />
      <div className='flex-grow bg-white text-slate-700 p-8 '>
        <ContainerMain>
          <ProductDetails product={product} />
          <div className='flex flex-col mt-20 gap-4'>
            <AddRating product={product} user={user}/>
            <ListRating product={product} />
          </div>
        </ContainerMain>
      </div>
      <Footer />
    </div>
  );
};

export default page;
