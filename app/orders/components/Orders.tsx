import ContainerMain from "@/app/component/ContainerMain";
import OrderClient from "./OrderClient";
import { getCurrentUser } from "@/action/getCurrentUser";
import NullData from "@/app/component/NullData";
import getOrdersByUserId from "@/action/getOrdersByUserId";

const Orders = async () => {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return <NullData title='Oops you are not authorized' />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title='No Orders yet!!' />;
  }

  return (
    <div>
      <div className='pt-8'>
        <ContainerMain>
          <OrderClient orders={orders} />
        </ContainerMain>
      </div>
    </div>
  );
};

export default Orders;
