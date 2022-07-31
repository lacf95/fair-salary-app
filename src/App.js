import './App.css';

function App() {
  return (
    <div className="App grid grid-rows-[auto_1fr_auto] h-full justify-items-center gap-y-4">
      <header className="App-header max-w-5xl w-full py-4 px-4 lg:px-8 border-b border-slate-900/10">
        <h1 className="text-2xl lg:text-center">💵 Salario justo</h1>
      </header>
      <main className="App-main max-w-5xl w-full py-4 px-4 lg:px-8">
        <div className="bg-orange-200 p-4 drop-shadow-md">
          <h2 className="text-lg lg:text-xl mb-2 lg:mb-4">En el último año has perdido <span className="font-bold">N%</span> de tu capacidad de compra.</h2>
          <h3 className="text-sm lg:text-base">Esto significa que si hacías el mandado con <span className="font-bold">NN.N MXN</span> ahora necesitas <span className="font-bold">NN.N MXN</span> para poder comprar lo mismo.</h3>
        </div>
      </main>
      <footer className="App-footer max-w-5xl w-full py-4 px-4 lg:px-8 border-t border-slate-900/10">
        <h3 className="text-sm lg:text-center">Información obtenida en Banxico de la serie SP74660 actualizada al mes de junio de 2022.</h3>
      </footer>
    </div>
  );
}

export default App;
