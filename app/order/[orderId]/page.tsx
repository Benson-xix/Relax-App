import ContainerMain from "@/app/component/ContainerMain";
import Header from "@/app/component/Header";
import Footer from "@/app/component/footer/Footer";
import React from "react";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/action/getOrderById";
import NullData from "@/app/component/NullData";

interface IParams {
  orderId: string;
}

const page = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params);

  if (!order) return <NullData title='No order'></NullData>;

  
  return (
    <div className='flex min-h-screen  flex-col  bg-slate-400 gap-3   '>
      <Header />
      <div className='flex-grow bg-white text-slate-700 p-8 '>
        <ContainerMain>
          <OrderDetails order={order} />
        </ContainerMain>
      </div>
      <Footer />
    </div>
  );
};

export default page;
