import React from 'react'
import ContainerMain from '../ContainerMain'
import FooterList from './FooterList'
import Link from 'next/link'
import {MdFacebook} from "react-icons/md";
import {AiFillTwitterCircle, AiFillInstagram, AiFillYoutube} from "react-icons/ai"
const Footer = () => {
  return (
    <footer className='bg-black text-sm mt-16  '>

        <ContainerMain>
            <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>

            {/* Relax Products Category */}
                <FooterList>
                    <h3 className='text-base font-bold mb-2 '>Relax Products Category</h3>
                    <Link href='#'>
                    Beds
                    </Link>
                    <Link href='#'>
                    Foams
                    </Link>
                    <Link href='#'>
                    Bed-Cover
                    </Link>
                    <Link href='#'>
                    Pillows
                    </Link>
                    <Link href='#'>
                    Futon
                    </Link>
                    <Link href='#'>
                    Bedroom-Light
                    </Link>
                </FooterList>
                
                {/* Customer Interaction */}

                <FooterList>
                    <h3 className='text-base font-bold mb-2 '>Customer Interaction</h3>
                    <Link href='#'>
                    Contact us
                    </Link>
                    <Link href='#'>
                    Relax shopping policy
                    </Link>
                    <Link href='#'>
                    Refunds & Sells
                    </Link>
                    <Link href='#'>
                    Insurance
                    </Link>
                    <Link href='#'>
                   FaQs
                    </Link>
                </FooterList>


                {/* about us */}

                <div className=' w-full md:w-1/3 mb-6 md:mb-0'>
                <h3 className='text-base font-bold mb-2 '>About Us</h3>
                <p className='mb-2  '>
                At Relax, we enhance your sleep with curated comfort, redefining relaxation through meticulously crafted beds, sumptuous foams, and exquisite bed-covers. 
                Our carefully selected pillows and versatile futons ensure a restful escape every night.
                 Welcome to unparalleled comfort, where your rejuvenation is our priority
                </p>
                     <p>&copy; {new Date().getFullYear()} Relax. All rights reserved</p>
                </div>


                <FooterList>
                <h3 className='text-base font-bold mb-2 '>Follow Us</h3>
                <div className=' flex gap-2'>
                <Link href='#'>
                    <MdFacebook size={24}/>
                </Link>

                <Link href='#'>
                <AiFillTwitterCircle size={24}/>
                </Link>

                <Link href='#'>
                <AiFillInstagram size={24}/>
                </Link>

                <Link href='#'>
                <AiFillYoutube size={24}/>
                </Link>
                </div>
                </FooterList>
            </div>
        </ContainerMain>
    </footer>
  )
}

export default Footer