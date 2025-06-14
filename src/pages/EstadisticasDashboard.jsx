import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

// Utilidad para limpiar el precio
const getSafePrice = (price) =>
  parseFloat(String(price ?? "").replace(/[^0-9.-]+/g, "")) || 0;

const EstadisticasDashboard = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    });
    return () => unsubscribe();
  }, []);

  const categorias = [...new Set(products.map((p) => p.category))];
  const stockPorCategoria = categorias.map((cat) =>
    products
      .filter((p) => p.category === cat)
      .reduce((acc, p) => acc + Number(p.stock), 0)
  );

  const valorTotalPorCategoria = categorias.map((cat) =>
    products
      .filter((p) => p.category === cat)
      .reduce((acc, p) => acc + Number(p.stock) * getSafePrice(p.price), 0)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 text-white">
      <Header currentPath={location.pathname} />

      <div className="p-6">
        <h2 className="text-2xl font-bold mt-10 mb-4 text-center">
          📊 Dashboard de Estadísticas
        </h2>

        {/* Indicadores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-800 p-4 rounded shadow text-center">
            <p className="text-sm">Productos Totales</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <div className="bg-green-800 p-4 rounded shadow text-center">
            <p className="text-sm">Stock Total</p>
            <p className="text-2xl font-bold">
              {products.reduce((acc, p) => acc + Number(p.stock), 0)}
            </p>
          </div>
          <div className="bg-yellow-700 p-4 rounded shadow text-center">
            <p className="text-sm">Valor Total</p>
            <p className="text-2xl font-bold">
              $
              {products
                .reduce(
                  (acc, p) => acc + Number(p.stock) * getSafePrice(p.price),
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <div className="bg-purple-700 p-4 rounded shadow text-center">
            <p className="text-sm">Promedio Rating</p>
            <p className="text-2xl font-bold">
              {(
                products.reduce((acc, p) => acc + Number(p.rating), 0) /
                  products.length || 0
              ).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Stock por Categoría</h3>
            <Bar
              data={{
                labels: categorias,
                datasets: [
                  {
                    label: "Unidades en stock",
                    data: stockPorCategoria,
                    backgroundColor: "rgba(59, 130, 246, 0.6)",
                  },
                ],
              }}
              options={{
                plugins: { legend: { labels: { color: "#fff" } } },
                scales: {
                  x: { ticks: { color: "#fff" } },
                  y: { ticks: { color: "#fff" } },
                },
              }}
            />
          </div>

          <div className="bg-slate-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">
              💰 Valor por Categoría
            </h3>
            <Pie
              data={{
                labels: categorias,
                datasets: [
                  {
                    label: "Valor Total",
                    data: valorTotalPorCategoria,
                    backgroundColor: [
                      "#3B82F6",
                      "#22C55E",
                      "#FBBF24",
                      "#8B5CF6",
                      "#EF4444",
                      "#EC4899",
                    ],
                  },
                ],
              }}
              options={{
                plugins: { legend: { labels: { color: "#fff" } } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasDashboard;

