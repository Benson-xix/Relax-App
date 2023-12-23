import ContainerMain from '@/app/component/ContainerMain'
import React from 'react'
import CartClient from './CartClient'
import { getCurrentUser } from '@/action/getCurrentUser'

const MainCart = async() => {

  const currentUser = await getCurrentUser()
  return (
    <div className='pt-8 '>
      <ContainerMain>
        <CartClient currentUser={currentUser} />
      </ContainerMain>
    </div>
  )
}

export default MainCart