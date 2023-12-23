"use client";
import { Product } from "@prisma/client";
import React, { useCallback } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/Utils/formatPrice";
import Heading from "@/app/component/products/Heading";
import Status from "@/app/component/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/component/ActionBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 150,

      renderCell: (params) => {
        return (
          <div className='font-bold text-slate-800'>{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 150 },
    { field: "brand", headerName: "Brand", width: 150 },
    {
      field: "inStock",
      headerName: "In-Stock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                text='in Stock'
                icon={MdDone}
                bg='bg-green-400'
                color='text-green-700'
              />
            ) : (
              <Status
                text='Out of Stock'
                icon={MdClose}
                bg='bg-rose-400'
                color='text-rose-700'
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className='flex justify-between gap-4 w-full '>
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Product Status Changed");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Ooops Something went Wrong");
        console.log(err);
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: any) => {
    toast("Deleting selected Product please wait");
    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          const imageRef = ref(storage, item.image);
          await deleteObject(imageRef);
          console.log("image deleted", item.image);
        }
      } catch (error) {
        return console.log("Deleting images error", error);
      }
    };

    await handleImageDelete();

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product has been removed");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Failed to remove product");
        console.log(err);
      });
  }, []);

  return (
    <div className='max-w-[1150px] m-auto text-xl'>
      <div className='mb-4 mt-8'>
        <Heading title='Manage Your Products' center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductClient;
