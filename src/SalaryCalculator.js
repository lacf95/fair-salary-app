import * as R from 'ramda';
import { useState, useEffect } from 'react';

import salaryAdjustment from './api/salary-adjustment';

const SalaryCalculator = () => {
  // Constants
  const EARLIEST_YEAR = 1969;
  const calculateStep = Symbol.for('calculateStep');
  const resultStep = Symbol.for('resultStep');

  // Helper functions
  const setProperty = R.curry((setter, transform = R.identity) => R.compose(setter, transform, R.path(['target', 'value'])));
  const monthName = R.compose(R.invoker(2, 'toLocaleString')('default', { month: 'long' }), R.constructN(2, Date)(EARLIEST_YEAR));

  // Handlers
  const handleSubmit = () => {
    salaryAdjustment({ date, salary }).then(res => {
      setResult(res)
      setStep(resultStep);
    }).catch(console.log);
  };

  const handleBack = () => {
    setStep(calculateStep);
  }

  // States
  const [result, setResult] = useState({
    salary: 1,
    adjustment: 0,
    adjustedSalary: 1,
    inflationRate: 0
  });
  const [step, setStep] = useState(calculateStep);
  const [invalidState, setInvalidState] = useState(true);
  const [date, setDate] = useState(null);
  const [years, setYears] = useState([]);
  const months = R.range(0, 12);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [salary, setSalary] = useState(1);

  // Efects
  // Set years
  useEffect(() => {
    R.compose(
      setYears,
      R.reverse,
      R.range(EARLIEST_YEAR),
      R.add(1),
      R.invoker(0, 'getFullYear'),
      R.constructN(0, Date)
    )()
  }, []);

  // Set year
  useEffect(() => { R.compose(setYear, R.head)(years) }, [years]);

  // Set month
  useEffect(() => {
    const now = new Date();

    if (now.getFullYear() === year && (!month || now.getMonth() < month)) {
      setMonth(now.getMonth());
    }
  }, [year, month]);

  // Set salary
  useEffect(() => {
    R.when(R.both(R.complement(R.isEmpty), R.lte(R.__, 0)), R.compose(setSalary, R.negate))(salary);
    R.compose(setInvalidState, R.isEmpty)(salary);
  }, [salary]);

  // Set date
  useEffect(() => {
    const formatMonth = R.compose(R.invoker(2, 'padStart')(2, '0'), R.toString, R.add(1));
    setDate(`${year}-${formatMonth(month)}-01`);
  }, [year, month]);

  // Render
  const ManualInstructions = () => (
    <div className="w-full">
      <details className="text-sm text-stone-600">
        <summary className="text-black mb-2">¿Cómo calcular manualmente?</summary>
        <ol className="list-disc list-inside">
          <li className="mb-1">Introduce el año y mes de la última actualización o aumento de salario que has obtenido.</li>
          <li className="mb-1">En salario percibido deja el valor 1, que equivale a 1 MXN.</li>
          <li className="mb-1">Da clic en calcular.</li>
          <li className="mb-1">Multiplica tu salario real por el salario ajustado a la inflación.</li>
        </ol>
      </details>
    </div>
  );

  const Result = () => (
    <div className="w-full sm:w-96 grid grid-flow-row auto-rows-min gap-y-4">
      <div className="w-full">
        <h3 className="text-xl lg:text-2xl">Has perdido el <span className="font-bold">{ result.inflationRate.toFixed(2) }%</span> de tu capacidad de compra.</h3>
      </div>

      <div className="w-full">
        <p>Tu salario ajustado a la inflación debería ser <span className="font-bold">{ result.adjustedSalary.toFixed(2) } MXN</span>.</p>
      </div>

      <ManualInstructions />

      <div className="w-full">
        <button
          onClick={ handleBack }
          type="button"
          className="w-full mt-4 px-6 py-4 sm:py-2 bg-teal-600 disabled:bg-stone-500 disabled:cursor-not-allowed hover:bg-teal-700 active:bg-teal-800 active:ring text-white drop-shadow-md font-bold">
          Volver a calcular
        </button>
      </div>
    </div>
  );

  return (
    <>
    { step === calculateStep ? (
      <div className="w-full sm:w-96 grid grid-flow-row auto-rows-min gap-y-4">
        <div className="w-full">
          <h3 className="text-xl lg:text-2xl">¿Cuál debería ser mi salario?</h3>
        </div>

        <div className="w-full">
          <p className="mb-2">Fecha de la última actualización de salario</p>
          <div className="w-full grid sm:grid-flow-col sm:auto-cols-auto gap-y-4 sm:gap-x-4">
            <select className="border-teal-600" value={ year } onChange={ setProperty(setYear, parseInt) }>
              { years.map(y => (<option key={ y } value={ y }>{ y }</option>)) }
            </select>

            <select className="border-teal-600" value={ month } onChange={ setProperty(setMonth, parseInt) }>
              { months.map(m => (<option key={ m } value={ m }>{ monthName(m) }</option>)) }
            </select>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Monto salarial</p>
          <input type="number" className="w-full text-right border-teal-600" value={ salary } onChange={ setProperty(setSalary, R.unless(R.isEmpty, parseFloat)) }/>
        </div>

        <div className="w-full">
          <p className="text-sm text-stone-600 italic">Los datos son enviados anónimamente de manera segura y no existe registro alguno de ellos. Aún así, puedes hacer el cálculo manualmente.</p>
        </div>

        <ManualInstructions />

        <div className="w-full">
          <button
            disabled={ invalidState }
            onClick={ handleSubmit }
            type="button"
            className="w-full mt-4 px-6 py-4 sm:py-2 bg-teal-600 disabled:bg-stone-500 disabled:cursor-not-allowed hover:bg-teal-700 active:bg-teal-800 active:ring text-white drop-shadow-md font-bold">
            Calcular
          </button>
        </div>
      </div>
    ) : <Result /> }
    </>
  );
};

export default SalaryCalculator;
