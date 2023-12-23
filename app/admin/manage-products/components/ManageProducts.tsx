import ContainerMain from "@/app/component/ContainerMain";
import AdminNav from "@/app/component/admin/AdminNav";
import React from "react";
import ManageProductClient from "./ManageProductClient";
import NullData from "@/app/component/NullData";
import getProducts from "@/action/getProducts";
import { getCurrentUser } from "@/action/getCurrentUser";

const ManageProducts = async () => {
  const products = await getProducts({category: null});
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== 'ADMIN'){
    return <NullData title='You are Not Authorized!'/>
  }

  return (
    <div>
      <AdminNav />
      <div className='pt-8'>
        <ContainerMain>
          <ManageProductClient   products={products}/>
        </ContainerMain>
      </div>
    </div>
  );
};

export default ManageProducts;
