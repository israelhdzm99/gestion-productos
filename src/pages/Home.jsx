import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaClipboardList, FaChartBar } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simula carga inicial
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5 segundos
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-900 text-white">
        <h1 className="text-3xl md:text-4xl font-bold animate-pulse">
          Cargando tu experiencia digital...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-900 text-white">
      {/* HEADER */}
      <header className="w-full px-6 py-4 bg-white bg-opacity-10 backdrop-blur-md shadow-md flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide">🖥️ Gestor de Productos</h1>
      </header>

      {/* CONTENIDO */}
      <main className="flex flex-col items-center justify-center px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center drop-shadow-lg">
          Bienvenido a tu catálogo digital
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div
            onClick={() => navigate("/registrar")}
            className="cursor-pointer bg-white bg-opacity-10 hover:bg-opacity-20 transition-all p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:-translate-y-1"
          >
            <FaPlusCircle className="text-4xl mb-4 text-green-400" />
            <h3 className="text-xl font-semibold">Registrar Producto</h3>
            <p className="text-sm mt-2">Agrega un nuevo producto digital a tu catálogo.</p>
          </div>

          <div
            onClick={() => navigate("/consultar")}
            className="cursor-pointer bg-white bg-opacity-10 hover:bg-opacity-20 transition-all p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:-translate-y-1"
          >
            <FaClipboardList className="text-4xl mb-4 text-yellow-400" />
            <h3 className="text-xl font-semibold">Consultar Productos</h3>
            <p className="text-sm mt-2">Visualiza, edita o elimina productos existentes.</p>
          </div>

          <div
            onClick={() => navigate("/estadisticas")} // o tu ruta de estadísticas
            className="cursor-pointer bg-white bg-opacity-10 hover:bg-opacity-20 transition-all p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:-translate-y-1"
          >
            <FaChartBar className="text-4xl mb-4 text-purple-400" />
            <h3 className="text-xl font-semibold">Estadísticas</h3>
            <p className="text-sm mt-2">Conoce el resumen visual de tu inventario.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

