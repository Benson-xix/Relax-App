import ContainerMain from '@/app/component/ContainerMain'
import FormWrap from '@/app/component/FormWrap'
import AdminNav from '@/app/component/admin/AdminNav'
import React from 'react'
import AddProductForm from './AddProductForm'
import { getCurrentUser } from '@/action/getCurrentUser'
import NullData from '@/app/component/NullData'

const AddProductsMain = async () => {

  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== 'ADMIN'){
    return <NullData title='You are Not Authorized!'/>
  }

  return (
    <div>
      <AdminNav/>   

      <div className='pt-8'>
       <div className='p-8'>
       <ContainerMain>
          <FormWrap>
            <AddProductForm/>
          </FormWrap>
        </ContainerMain>
       </div>
      </div>
    </div>
  )
}

export default AddProductsMain