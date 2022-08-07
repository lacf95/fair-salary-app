import * as R from 'ramda';
import { useEffect, useState } from 'react';

import lastMonthlyInflation from './api/monthly-inflation.js';

const Footer = () => {
  const [lastRate, setLastRate] = useState({});

  const monthName = R.compose(R.invoker(2, 'toLocaleString')('default', { month: 'long' }), R.constructN(2, Date)(2000));

  useEffect(() => {
    lastMonthlyInflation().then(setLastRate).catch(console.log);
  }, []);

  return (
    <footer className="App-footer max-w-5xl w-full py-4 px-4 lg:px-8 border-t border-slate-900/10">
      <h3 className="text-stone-600 text-sm sm:text-center">Información obtenida de <a target="_blank" rel="noreferrer" className="font-bold underline text-sky-600 hover:text-sky-700 active:text-sky-800" href="https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=CP154&locale=es">Banxico</a> con última actualización al mes de { monthName(lastRate.date.slice(5, 7)) } de { lastRate.date.slice(0, 4) }.</h3>
    </footer>
  );
};

export default Footer;
