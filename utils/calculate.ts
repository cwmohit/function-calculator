export const parseEquation = (equation: string, xValue: number): string => {
    // Replace all instances of `x` with `*x`, handling cases like `2x` → `2 * x`
    let parsedEquation = equation.replace(/(\d)x/g, '$1 * x');
    
    // Replace `x` with the actual value
    parsedEquation = parsedEquation.replace(/x/g, `${xValue}`);
  
    // Handle exponents (e.g., x^2 → x**2)
    parsedEquation = parsedEquation.replace(/\^/g, '**');
  
    return parsedEquation;
};
  
  
export const evaluateEquation = (equation: string): number | null => {
    try {
      return eval(equation);
    } catch (error) {
      console.error('Invalid equation:', error);
      return null;
    }
};
  