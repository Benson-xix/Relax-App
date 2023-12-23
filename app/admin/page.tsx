import React from 'react'
import Header from '../component/Header'
import Footer from '../component/footer/Footer'
import AdminMain from './component/AdminMain'

const page = () => {
  return (
    <div className="flex min-h-screen  flex-col  bg-slate-400 gap-3   ">
    <Header />
    <div className="flex-grow bg-white text-slate-700">
      <AdminMain/>
      </div>
    <Footer/>
    </div>
  )
}

export default page