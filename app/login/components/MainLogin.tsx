import ContainerMain from '@/app/component/ContainerMain'
import FormWrap from '@/app/component/FormWrap'
import React from 'react'
import LoginForm from './LoginForm'
import { getCurrentUser } from '@/action/getCurrentUser'

const MainLogin = async () => {
  const currentUser = await getCurrentUser()
  return (
    <ContainerMain>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </ContainerMain>
  )
}

export default MainLogin