"use client";

import ContainerMain from "../ContainerMain";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/Utils/Categories";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  console.log("searchParams:", params);
  console.log("Category in getProducts:", category);

  

  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <div className='bg-white'>
      <ContainerMain>
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={
                category === item.label ||
                (category === null && item.label === "All")
              }
            />
          ))}
        </div>
      </ContainerMain>
    </div>
  );
};

export default Categories;
