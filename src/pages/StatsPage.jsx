import CategoryChart from "../components/CategoryChart";
import CategoryPieChart from "../components/CategoryPieChart";

const StatsPage = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Estadísticas del Catálogo</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <CategoryChart />
        <CategoryPieChart />
      </div>
    </div>
  );
};

export default StatsPage;
