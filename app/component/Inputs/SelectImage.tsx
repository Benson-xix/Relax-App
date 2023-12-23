"use client"

import { ImageType } from '@/app/admin/add-products/component/AddProductForm';
import {useDropzone} from 'react-dropzone'
import React, { useCallback } from 'react'

interface SelectImageProps {
    item?: ImageType;
    handleFileChange: (value: File) => void
}

const SelectImage: React.FC<SelectImageProps> = ({item,handleFileChange}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      if(acceptedFiles.length > 0){
        handleFileChange(acceptedFiles[0])
      }
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, 
        accept: {'image/*' : ['jpeg', '.png']}
    });


  return (
    <div {...getRootProps()} className='border-2 border-green-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-600 flex items-center justify-center'>
        <input {...getInputProps()} />
        {isDragActive ? (<p>Add image here...</p>) : (<p>+ {item?.color} Image</p>)}
    </div>
  )
}

export default SelectImage