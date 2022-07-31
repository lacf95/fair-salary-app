const SalaryCalculator = () => (
  <div className="w-full sm:w-96 grid grid-flow-row auto-rows-min gap-y-4">
    <div className="w-full">
      <h3 className="text-xl lg:text-2xl">Calcula el salario que deberías percibir</h3>
    </div>
    <div className="w-full">
      <p>Fecha de obtención de tu último salario</p>
      <div className="w-full grid sm:grid-flow-col sm:auto-cols-auto gap-y-4 sm:gap-x-4">
        <select className="border-emerald-600">
          <option>2022</option>
          <option>2021</option>
          <option>2020</option>
        </select>
        <select className="border-emerald-600">
          <option>Enero</option>
          <option>Febrero</option>
          <option>Marzo</option>
        </select>
      </div>
    </div>
    <div className="w-full">
      <p>Salario</p>
      <input type="number" className="w-full text-right border-emerald-600" />
    </div>
    <div className="w-full">
      <button type="button" className="w-full mt-8 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 active:ring text-white drop-shadow-md font-medium">Calcular</button>
    </div>
  </div>
);

export default SalaryCalculator;
