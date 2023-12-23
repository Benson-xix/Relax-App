import ContainerMain from "@/app/component/ContainerMain";
import AdminNav from "@/app/component/admin/AdminNav";
import React from "react";
import ManageOrdersClient from "./ManageOrdersClient";
import { getCurrentUser } from "@/action/getCurrentUser";
import NullData from "@/app/component/NullData";
import getOrders from "@/action/getOrders";



const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== 'ADMIN'){
    return <NullData title='You are Not Authorized!'/>
  }


  return (
    <div>
         <AdminNav/>   

             <div className='pt-8'>
        <ContainerMain>
          <ManageOrdersClient   orders={orders}/>
        </ContainerMain>
      </div>
    </div>
  )
}

export default ManageOrders