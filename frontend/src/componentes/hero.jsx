import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gray-800 text-white h-screen flex items-center justify-center">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bienvenido a Mi Sitio Web
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Este es el lugar perfecto para mostrar algo increíble a tu audiencia.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300">
          ¡Empieza Ahora!
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
