import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

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

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Distribución por Categoría",
        color: "#ffffff",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-bold mb-2 text-white">🥧 Distribución por Categoría</h3>
      <Pie data={dataChart} options={options} />
    </div>
  );
};

export default CategoryPieChart;
