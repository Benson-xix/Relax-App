import Header from '@/app/component/Header'
import Footer from '@/app/component/footer/Footer'
import React from 'react'
import ManageOrders from './components/ManageOrders'

const page = () => {
  return (
    <div className="flex min-h-screen  flex-col  bg-slate-400 gap-3   ">
    <Header />
    <div className="flex-grow bg-white text-slate-700">
      <ManageOrders/>
      </div>
    <Footer/>
    </div>
  )
}

export default page