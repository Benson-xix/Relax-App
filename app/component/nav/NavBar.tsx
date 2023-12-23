import React from "react";
import ContainerMain from "../ContainerMain";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";

import { getCurrentUser } from "@/action/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";


const redressed = Redressed({subsets: ['latin'],
weight: ['400']
})

const NavBar = async () => {

  const currentUser = await getCurrentUser();



 
  return (
    <div className='sticky top-0 w-full bg-gray-400 z-30 shadow-sm '>
      <div className='py-4 border-b-[1px]'>
        <ContainerMain>
          <div className="flex items-center justify-between gap-3 md:gap-0 ">
            <Link className={`${redressed.className} font-bold text-2xl `} href='/'>Relax</Link>
            <div className="hidden md:block">
             <SearchBar/>
            </div>

            <div className="flex items-cenetr gap-8 md:gap-12">
              <CartCount  />
              <UserMenu currentUser = {currentUser}/>
            </div>
          </div>
        </ContainerMain>
      </div>
      <Categories/>
    </div>
  );
};

export default NavBar;
