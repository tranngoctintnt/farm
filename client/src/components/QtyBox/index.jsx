import { Button } from '@mui/material'
import React, { useState,forwardRef,useImperativeHandle } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";


export const QtyBox = forwardRef((props, ref) => {
    const [inputValue, setInputValue] = useState(1);
    
    const minus = ()=>{
        if(inputValue !== 1 && inputValue > 0){
            setInputValue(inputValue -1);
        }
    }

    const plus = ()=>{
            setInputValue(inputValue + 1);
    }
    useImperativeHandle(ref, () => ({
        getValue: () => inputValue,
        setValue: (val) => setInputValue(val),
      }));
  return (
    <div className='flex items-center'>
        <div className="qtyDrop flex items-center w-[10rem] gap-4">
            <Button onClick={minus} className='!min-w-[2.5rem] !w-[2.5rem] !h-[2.5rem] !rounded-full !bg-[#edeef5] !border !border-solid !border-[rgba(0,0,0,0.1)] text-[#000]'>
                <FaMinus className='text-[#000]'/>
            </Button>
                <input className='w-[2rem] border-0 bg-transparent !outline-none text-center' type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <Button onClick={plus} className='!min-w-[2.5rem] !w-[2.5rem] !h-[2.5rem] !rounded-full !bg-[#edeef5] !border !border-solid !border-[rgba(0,0,0,0.1)] text-[#000]'>
                <FaPlus className='text-[#000]'/>
            </Button>
        </div>
    </div>
  )
})
