

// import ContainerMain from './ContainerMain'
// import NullData from './NullData'
// import Banner from './main-comp/Banner'
// import ProductCard from './products/ProductCard'
// import { products } from '@/Utils/products'
// import getProducts, { IProductParams } from '@/action/getProducts'

// interface MainProps{
//     searchParams: IProductParams
// }

// export default async function Main  ({searchParams} : MainProps)  {
 
//     console.log("searchParams:", searchParams);
//     const products = await getProducts(searchParams);


//     if(products.length === 0){
//         return <NullData title='Oops! No products found. Click "all" to clear filters'/>
//     }



//     //fisher-yates

//     function shuffleArray(array: any){
//         for(let i = array.length -1; i > 0; i--){
//             const j = Math.floor(Math.random() * (i+1));
//             [array[i], array[j]] = [array[j], array[i]]
//         }

//         return array
//     }


//     const shuffledProducts = shuffleArray(products)

//   return (
//     <div className='p-8 '>
//         <ContainerMain>
//             <div>
//                 <Banner/>
//             </div>

//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-8'>
//                 {shuffledProducts.map((product:any) => {
//                     return <ProductCard key={product.id} data={product}/>
//                 })}
//             </div>
//         </ContainerMain>
//     </div>
//   )
// }

