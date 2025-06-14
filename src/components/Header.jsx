import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isConsultPage = location.pathname.includes("consultar");

  return (
    <header className="w-full px-6 py-4 bg-white bg-opacity-10 backdrop-blur-sm shadow-md fixed top-0 left-0 z-50 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold tracking-wide">🌐 Catálogo Digital</h1>
      <nav className="space-x-4 text-sm md:text-base">
        <Link to="/" className="hover:underline">
          Inicio
        </Link>
        {isConsultPage ? (
          <Link to="/registrar" className="hover:underline">
            Registrar
          </Link>
        ) : (
          <Link to="/consultar" className="hover:underline">
            Consultar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
