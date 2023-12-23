import React from "react";

interface MenuAreaProps{
    children: React.ReactNode;
    onClick: () => void
}


const MenuArea:React.FC<MenuAreaProps> = ({children,onClick}) => {
    return ( 
        <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition">
            {children}
        </div>
     );
}
 
export default MenuArea;