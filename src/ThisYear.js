import { useState, useEffect } from 'react';

import salaryAdjustment from './api/salary-adjustment.js';

const ThisYear = () => {
  // Constants
  const DEFAULT_SALARY = 500;

  // States
  const [result, setResult] = useState({
    salary: 1,
    adjustment: 0,
    adjustedSalary: 1,
    inflationRate: 0
  });

  useEffect(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    date.setDate(1);
    const salary = DEFAULT_SALARY;
    salaryAdjustment({ date: date.toISOString().slice(0, 10), salary }).then(res => {
      setResult(res);
    }).catch(console.log);
  }, []);

  return (
    <div className="bg-orange-200 p-4 drop-shadow-md w-full">
      <h2 className="text-lg lg:text-xl mb-2 lg:mb-4">En el último año has perdido <span className="font-bold">{ result.inflationRate.toFixed(2) }%</span> de tu capacidad de compra.</h2>
      <h3 className="text-sm lg:text-base">Esto significa que si hacías el mandado con <span className="font-bold">{ result.salary.toFixed(2) } MXN</span> ahora necesitas <span className="font-bold">{ result.adjustedSalary.toFixed(2) } MXN</span> para poder comprar lo mismo.</h3>
    </div>
  );
};

export default ThisYear;
