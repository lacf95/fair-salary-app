import ThisYear from './ThisYear.js';
import SalaryCalculator from './SalaryCalculator.js';

const Main = () => (
  <main className="App-main max-w-5xl w-full py-4 px-4 lg:px-8 grid grid-flow-row auto-rows-min gap-y-16 justify-items-center">
    <ThisYear />
    <SalaryCalculator />
  </main>
);

export default Main;
