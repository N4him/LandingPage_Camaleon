import React from "react";

const Alliances: React.FC = () => {
  return (
    <section className="bg-red-700 text-white p-10 text-center">
      <h2 className="text-2xl font-semibold mb-2">
        Alianzas y Convenios Actuales
      </h2>
      <p className="text-lg mb-8 font-light">Con el Laboratorio Camaleón</p>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-col items-center w-32 text-center p-4 bg-white rounded-lg shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl">
          <img
            src="/images/logo1.png"
            alt="Logo Institución 1"
            className="w-16 h-16 object-contain transition-transform hover:scale-110"
          />
          <p className="mt-2 text-gray-800 font-medium">Institución 1</p>
        </div>
        {/* Repite la estructura para cada convenio */}
      </div>
      {/* Repite la estructura para cada convenio __seccion 2 */}
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-col items-center w-32 text-center p-4 bg-white rounded-lg shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl">
          <img
            src="/images/logo1.png"
            alt="Logo Institución 2"
            className="w-16 h-16 object-contain transition-transform hover:scale-110"
          />
          <p className="mt-2 text-gray-800 font-medium">Institución 2</p>
        </div>
        {/* Repite la estructura para cada convenio */}
      </div>
      {/* Repite la estructura para cada convenio __seccion 3 */}
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-col items-center w-32 text-center p-4 bg-white rounded-lg shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl">
          <img
            src="/images/logo1.png"
            alt="Logo Institución 3"
            className="w-16 h-16 object-contain transition-transform hover:scale-110"
          />
          <p className="mt-2 text-gray-800 font-medium">Institución 3</p>
        </div>
        {/* Repite la estructura para cada convenio */}
      </div>
    </section>
  );
};

export default Alliances;
