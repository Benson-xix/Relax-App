

"use client"
import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

 

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?:boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

const Input: React.FC <InputProps> = ({id,label,type,disabled,required,register,errors}) => {
  return (
    <div className="w-full relative">
        <input autoComplete="off" id={id} disabled={disabled} placeholder="" type={type} {...register(id, {required})} className={`peer w-full p-4 pt-6 outline-none text-black  font-light border-2 rounded-md transition  disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-rose-400' : 'border-green-300'  } ${errors[id] ? 'focus:border-rose-500' : 'focus:border-green-400'  }  `}/>
      <label className={`absolute text-black cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? "text-rose-500 " : "text-black"} `} htmlFor={id}>{label}</label>
    </div>
  )
}

export default Input