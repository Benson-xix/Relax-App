import { formatPrice } from "@/Utils/formatPrice"
import { truncateText } from "@/Utils/truncateText"
import SetQuantity from "@/app/component/products/SetQuantity"
import { CartProductType } from "@/app/product/[productId]/ProductDetails"
import { useCart } from "@/hooks/useCart"
import Image from "next/image"
import Link from "next/link"



interface ItemContentProps {
    item: CartProductType
}



const ItemContent: React.FC <ItemContentProps> = ({item}) => {
    const {handleRemoveProductFromCart, handleCartQtyIncrease,handleCartQtyDecrease} = useCart()
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-yellow-400 px-2 py-4 items-center">
        <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 ">
            <Link href={`/product/${item.id}`}>
            <div className="relative w-[70px] aspect-square">
                <Image src={item.selectedImg.image} alt="item.name" fill className="object-contain"/>
            </div>
            </Link>
            <div className="flex flex-col text-white justify-between">
            <Link href={`/product/${item.id}`}>
                {truncateText(item.name)}
                <div>{item.selectedImg.color}</div>
                <div className="w-[70px]">
                    <button onClick={() => handleRemoveProductFromCart(item)} className="text-rose-400 underline">
                        Remove
                    </button>
                </div>
            </Link>
            </div>
        </div>
        <div className=" justify-self-center text-white ">{formatPrice(item.price)}</div>
        <div className=" justify-self-center text-white ">
            <SetQuantity
            cartCounter={true}
            cartProduct={item}
            handleQtyIncrease={() => {handleCartQtyIncrease (item)}}
            handleQtyDecrease={() => {handleCartQtyDecrease (item)}}
            />
        </div>
        <div className=" justify-self-end font-semibold text-white ">
            {item.price * item.quantity}
        </div>
    </div>
  )
}

export default ItemContent