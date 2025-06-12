import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ products }) => {
  const [dataChart, setDataChart] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
  if (!Array.isArray(products)) return;

  const counts = {};
  products.forEach((p) => {
    const cat = p.category || "Sin categoría";
    counts[cat] = (counts[cat] || 0) + 1;
  });

  const labels = Object.keys(counts);
  const values = Object.values(counts);

  setDataChart({
    labels,
    datasets: [
      {
        label: "Distribución por categoría",
        data: values,
        backgroundColor: [
          "#3B82F6", "#22C55E", "#FACC15", "#EC4899", "#8B5CF6", "#F97316"
        ],
        borderWidth: 1,
      },
    ],
  });
}, [products]);


  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">🥧 Distribución por Categoría</h3>
      <Pie data={dataChart} options={{ responsive: true }} />
    </div>
  );
};

export default CategoryPieChart;

