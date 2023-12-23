
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/action/getCurrentUser"


export async function POST(requst: Request){
    const currentUser = await getCurrentUser();


    if (!currentUser) return NextResponse.error();

    if (currentUser.role !== "ADMIN") {
      return NextResponse.error();
    }
  

    const body = await requst.json();
    const {name, description, price, brand, category, inStock, images} = body

    

    const product = await prisma.product.create({
        data:{
            name,
            description,
            brand,
            price: parseFloat(price),
            category,
            inStock, 
            images 
         
        }
    })

    return NextResponse.json(product);
}


export async function PUT(request: Request){
    const currentUser = await getCurrentUser();


    if(!currentUser || currentUser.role !== 'ADMIN'){
        return NextResponse.error();
    }


    const body = await request.json()
    const{id, inStock} = body


    const product = await prisma.product.update({
        where:{id: id},
        data:{inStock},
    });


    return NextResponse.json(product)
}