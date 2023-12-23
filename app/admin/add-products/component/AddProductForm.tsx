"use client";
import { useState, useEffect, useCallback } from "react";
import Input from "@/app/component/Inputs/Input";
import Heading from "@/app/component/products/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "@/app/component/Inputs/TextArea";
import CustomCheckBox from "@/app/component/Inputs/CustomCheckBox";
import { categories } from "@/Utils/Categories";
import CategoryInput from "@/app/component/Inputs/CategoryInput";
import { colors } from "@/Utils/Colors";
import SelectColor from "@/app/component/Inputs/SelectColor";
import Button from "@/app/component/Button";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";
import { error } from "console";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("Images is not selected pls add the image");
    }

    const handleImageUploads = async () => {
      toast("Creating Product, be Patient..");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error Uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the download Url", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("An error Occured");
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        console.error(
          "Error adding product:",
          error.response?.data || error.message
        );
        toast.error("Something went wrong when adding product to db");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
    });
  }, []);

  return (
    <>
      <Heading title='Add a Product' />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id='price'
        label='Price'
        disabled={isLoading}
        register={register}
        errors={errors}
        type='number'
        required
      />

      <Input
        id='brand'
        label='Brand'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id='description'
        label='Description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <CustomCheckBox
        id='inStock'
        register={register}
        label='This Product is in Stock'
      />

      <div className='w-full font-medium'>
        <div className='mb-2 font-semibold'>Select a Category</div>

        <div className='grid grid-cols-2 md:grid-cols-3 max-h-[50vh] gap-3 overflow-y-auto'>
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }

            return (
              <div key={item.label} className='col-span '>
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className='w-full flex flex-col flex-wrap gap-4'>
        <div>
          <div className='font-bold'>
            Select the available colors for the product so as to Upload their
            Images.
          </div>
          <div className='text-sm'>
            You must add an Image for Each of the color section otherwise the
            color section will be ignored!.
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
