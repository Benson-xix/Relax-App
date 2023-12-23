import Header from '@/app/component/Header'
import Footer from '@/app/component/footer/Footer'
import React from 'react'
import ManageProducts from './components/ManageProducts'

const page = () => {
  return (
    <div className="flex min-h-screen  flex-col  bg-slate-400 gap-3   ">
    <Header />
    <div className="flex-grow bg-white text-slate-700">
      <ManageProducts/>
      </div>
    <Footer/>
    </div>

  )
}

export default page