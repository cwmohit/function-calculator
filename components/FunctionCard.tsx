// components/FunctionCard.tsx
import Image from 'next/image';
import { FC, useState } from 'react';

export interface FunctionCardProps {
  questionLabel: string;
  nextFunction: string;
  onChangeEquation: (equation: string) => void;
  className?: string;
}

const FunctionCard: FC<FunctionCardProps> = ({ questionLabel, nextFunction, className, onChangeEquation }) => {
  const [equation, setEquation] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regular expression to validate the input format (only arithmetic with x, ^, and numbers)
    const regex = /^[0-9x\+\-\*\/\^\(\) ]*$/;
    if (!regex.test(value)) {
      alert('Invalid input! Only valid arithmetic expressions with x are allowed.');
      return;
    }

    setEquation(value);
    onChangeEquation(value);
  };

  return (
    <div className={`border p-4 shadow-sm rounded-2xl border-gray-200 bg-white ${className}`}>
      <div className="text-sm font-inter text-[#A5A5A5] font-semibold mb-4 flex items-center gap-2">
        <Image 
          src="/function.svg"  
          alt="Function Icon"  
          width={12}          
          height={12}          
        />
        {questionLabel}
      </div>

      <label className='text-[#252525] text-xs font-medium'>Equation</label>
      <input
        type="text"
        value={equation}
        onChange={handleInputChange}
        placeholder="Enter equation (e.g. 2x+4, x^2)"
        className="mt-1 p-2 border w-full rounded-lg text-lg placeholder:text-sm"
      />

      <div className="mt-4">
        <label className='text-[#252525] text-xs font-medium'>Next Function</label>
        <select disabled className="select p-2 border rounded-lg w-full mt-1 bg-gray-100 font-inter font-medium text-[#252525] tex-xs placeholder:text-xs">
          <option>{nextFunction}</option>
        </select>
      </div>

      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id={questionLabel+"inputEnd"}
            defaultChecked
          />
          <label htmlFor={questionLabel+"inputEnd"} className="text-sm font-inter">Input</label>
        </div>

        <div className="flex items-center flex-row-reverse gap-2">
          <input
            type="radio"
            id={questionLabel+"outputEnd"}
            defaultChecked
          />
          <label htmlFor={questionLabel+"outputEnd"} className="text-sm font-inter">Output</label>
        </div>
      </div>
    </div>
  );
};

export default FunctionCard;