import ContainerMain from '@/app/component/ContainerMain'
import FormWrap from '@/app/component/FormWrap'
import React from 'react'
import CheckOutClient from './CheckOutClient'

const MainCheckOut = () => {
  return (
    <div className='p-8 '>
    <ContainerMain>
        <FormWrap>
           <CheckOutClient/>
        </FormWrap>
    </ContainerMain>
</div>
  )
}

export default MainCheckOut