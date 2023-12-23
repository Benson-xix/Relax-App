import prisma from "@/libs/prismadb";

export interface IProductParams{
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const {category, searchTerm} = params;
    console.log("Category in getProducts:", category);

    let searchString = searchTerm;

    if(!searchTerm){
      searchString = ''
    }

    let query: any = {}


    console.log("Category before assignment:", category);
    if (category !== null && category !== undefined) {
      query.category = category;
    }

    

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });



    

    return products;
  
  } catch (error: any) {
    throw new Error(error);
  }
}
