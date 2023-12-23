import AdminNav from "@/app/component/admin/AdminNav";
import React from "react";
import Summary from "./Summary";
import BarGraph from "./BarGraph"
import getProducts from "@/action/getProducts";
import getOrders from "@/action/getOrders";
import getUsers from "@/action/getUsers";
import getGraphData from "@/action/getGraphData"
import ContainerMain from "@/app/component/ContainerMain";

const AdminMain = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();
  return (
    <div>
      <AdminNav />
      <div className='pt-8'>
        <ContainerMain>
          <Summary products={products} orders={orders} users={users} />
          <div className="mt-4 mx-auto max-w-[1150px]">
            <BarGraph data={graphData}/>
          </div>
        </ContainerMain>
      </div>
    </div>
  );
};

export default AdminMain;
