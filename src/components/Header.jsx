import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-white bg-opacity-10 backdrop-blur-sm shadow-md fixed top-0 left-0 z-50 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold tracking-wide">🌐 Catálogo Digital</h1>
      <nav className="flex gap-4 text-sm font-medium">
        <Link to="/" className="hover:text-yellow-300 transition">Inicio</Link>
        <Link to="/consultar" className="hover:text-yellow-300 transition">Consultar</Link>
        <Link to="/estadisticas" className="hover:text-yellow-300 transition">Estadísticas</Link>
      </nav>
    </header>
  );
};

export default Header;
