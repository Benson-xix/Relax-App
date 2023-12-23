"use client"

import { useCallback, useState } from "react"
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuArea from "./MenuArea";

import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";

interface UserMenuProps{
    currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, [])



  return (
    <>
    <div className='relative z-30'>
    <div onClick={toggleOpen} className="p-2 border-[1px] border-yellow-400 flex items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-white"  >
    <Avatar src={currentUser?.image} />
    <AiFillCaretDown/>
    </div>


    {isOpen && (
        <div className="absolute rounded-md w-[170px] text-black border-[1px] border-yellow-400 bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ?   <div>
                <Link href="/orders">
                <MenuArea onClick={toggleOpen}>
                    Your Orders
                </MenuArea>
                </Link>

                <Link href="/admin">
                <MenuArea onClick={toggleOpen}>
                    Admin Dashboard
                </MenuArea>
                </Link>
                <hr />
                <MenuArea onClick={() => {
                    toggleOpen();
                    signOut();
                }
                    
                     }>
                    LogOut
                </MenuArea>
                
            </div> 

            :

            <div>
            <Link href="/login">
                <MenuArea onClick={toggleOpen}>
                    Login
                </MenuArea>
                </Link>

            <Link href="/register">
                <MenuArea onClick={toggleOpen}>
                    Join Us
                </MenuArea>
                </Link>

               
            </div>}
            
          
        </div>
    )}
    </div>
    {isOpen ? <BackDrop onClick={toggleOpen}/> : null}
    </>
  )
}

export default UserMenu