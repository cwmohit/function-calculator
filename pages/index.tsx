// pages/index.tsx
import React, { useState } from 'react';
import FunctionCard, { FunctionCardProps } from '../components/FunctionCard';
import { evaluateEquation, parseEquation } from '@/utils/calculate';

const Home = () => {
  const [initialValue, setInitialValue] = useState<number>(0);
  const [functions, setFunctions] = useState<string[]>(['', '', '', '', '']);
  const [finalResult, setFinalResult] = useState<number | null>(null);

  const handleEquationChange = (index: number, equation: string) => {
    const newFunctions = [...functions];
    newFunctions[index] = equation;
    setFunctions(newFunctions);
    calculateResult(initialValue, newFunctions);
  };

  const calculateResult = (initialValue: number, functions: string[]) => {
    let result = initialValue;
    const order = [0, 1, 3, 4, 2]; // Order of execution: 1 → 2 → 4 → 5 → 3
  
    try {
      for (let i = 0; i < order.length; i++) {
        const funcIndex = order[i];
        const equation = functions[funcIndex];
  
        // Check if the equation is defined (non-empty)
        if (!equation) continue; 
        const parsedEquation = parseEquation(equation, result);
        // Evaluate the equation
        const evaluatedResult = evaluateEquation(parsedEquation);
  
        if (evaluatedResult === null) {
          throw new Error('Invalid equation');
        }
  
        result = evaluatedResult;
      }
  
      // Only set the final result if it's defined
      if (result !== null && result !== undefined) {
        setFinalResult(result);
      }
    } catch (error) {
      console.error('Error in equation:', error);
      setFinalResult(null);
    }
  };  

  const functionsCards: FunctionCardProps[] = [
    {
      questionLabel: "Function 1",
      nextFunction: "Function 2",
      className: "col-span-2",
      onChangeEquation: (eq) => handleEquationChange(0, eq),
    },
    {
      questionLabel: "Function 2",
      nextFunction: "Function 4",
      className: "col-span-2",
      onChangeEquation: (eq) => handleEquationChange(1, eq),
    },
    {
      questionLabel: "Function 3",
      nextFunction: "End",
      className: "col-span-2",
      onChangeEquation: (eq) => handleEquationChange(2, eq),
    },
    {
      questionLabel: "Function 4",
      nextFunction: "Function 5",
      className: "col-span-2 col-start-2",
      onChangeEquation: (eq) => handleEquationChange(3, eq),
    },
    {
      questionLabel: "Function 5",
      nextFunction: "Function 3",
      className: "col-span-2 col-start-4",
      onChangeEquation: (eq) => handleEquationChange(4, eq),
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-[1340px] min-h-screen m-auto flex items-center w-full">

      {/* Function Chain */}
      <div className="min-h-[60vh] flex gap-6 w-full">
        {/* Initial Input */}
        <div className="max-w-[120px] gap-2 flex flex-col h-[300px] justify-end pb-4">
          <label className='bg-[#E29A2D] rounded-[14px] text-white p-1 text-center text-xs font-inter font-bold'>Initial Value (x):</label>
          <input
            type="number"
            value={initialValue}
            onChange={(e) => setInitialValue(parseFloat(e.target.value))}
            className="px-2 py-3 border w-full rounded-xl border-[#FFC267] text-lg font-bold font-inter"
          />
        </div>

        <div className="grid grid-cols-6 grid-flow-row gap-20 w-full relative">
        {functionsCards.map((func, index) => (
          <React.Fragment key={func.questionLabel}>
              <FunctionCard
                questionLabel={func.questionLabel}
                nextFunction={func.nextFunction}
                className={func.className}
                onChangeEquation={func.onChangeEquation}
              />
              {index < functionsCards.length - 1 && <div className={`connector-${index + 1}`} />} {/* Connector */}
            </React.Fragment>
          ))}
        </div>
        
        {/* Final Output */}
        <div className="flex flex-col gap-2 min-w-[120px] h-[300px] justify-end pb-4">
        <label className='bg-[#E29A2D] rounded-[14px] text-white p-1 text-center text-xs font-inter font-bold'>Final Output (y):</label>
          <div className="px-2 py-3 border w-full rounded-xl border-[#FFC267] text-lg font-bold font-inter">
            {finalResult !== null ? finalResult : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;