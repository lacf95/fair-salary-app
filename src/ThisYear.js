const ThisYear = () => {
  return (
    <div className="bg-orange-200 p-4 drop-shadow-md w-full">
      <h2 className="text-lg lg:text-xl mb-2 lg:mb-4">En el último año has perdido <span className="font-bold">N%</span> de tu capacidad de compra.</h2>
      <h3 className="text-sm lg:text-base">Esto significa que si hacías el mandado con <span className="font-bold">NN.N MXN</span> ahora necesitas <span className="font-bold">NN.N MXN</span> para poder comprar lo mismo.</h3>
    </div>
  );
};

export default ThisYear;
