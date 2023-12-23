export const revalidate = 0;

import getProducts, { IProductParams } from "@/action/getProducts";
import Header from "./component/Header";
import Footer from "./component/footer/Footer";
import NullData from "./component/NullData";
import ContainerMain from "./component/ContainerMain";
import Banner from "./component/main-comp/Banner";
import ProductCard from "./component/products/ProductCard";

interface MainProps{
  searchParams: IProductParams;
}

export default async   function Home ({searchParams} : MainProps) {


  console.log("searchParams:", searchParams);
  const products = await getProducts(searchParams);


  // if(products.length === 0){
  //     return <NullData title='Oops! No products found. Click "all" to clear filters'/>
  // }



  //fisher-yates

  function shuffleArray(array: any){
      for(let i = array.length -1; i > 0; i--){
          const j = Math.floor(Math.random() * (i+1));
          [array[i], array[j]] = [array[j], array[i]]
      }

      return array
  }


  const shuffledProducts = shuffleArray(products)


  return (
    <div className="flex min-h-screen  flex-col  bg-slate-400 gap-3   ">
    <Header />
    <div className="flex-grow bg-white text-slate-700">
      {/* <Main searchParams={searchParams}/> */}
      <div  className='p-8 '>
      <ContainerMain>
            <div>
                <Banner/>
            </div>

            {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-8'>
                {shuffledProducts.map((product:any) => {
                    return <ProductCard key={product.id} data={product}/>
                })}
            </div> */}
           {products.length === 0 ? (
              <NullData title='Oops! No products found. Click "all" to clear filters' />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {shuffledProducts.map((product: any) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            )}
        </ContainerMain>
      </div>

      </div>
    <Footer/>
    </div>
  )
}
