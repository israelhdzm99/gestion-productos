import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ProductTable from "../components/ProductTable";
import CategoryChart from "../components/CategoryChart";
import CategoryPieChart from "../components/CategoryPieChart";
import Header from "../components/Header";

const ViewProducts = () => {
  const [filters, setFilters] = useState({
    category: "",
    priceMin: 0,
    priceMax: 1000,
    orderBy: "",
  });

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const categorias = [...new Set(products.map((p) => p.category).filter(Boolean))];
      const precios = products.map((p) => parseFloat(p.price));
      const min = Math.min(...precios);
      const max = Math.max(...precios);

      setAllProducts(products);
      setCategories(categorias);
      setPriceRange({ min, max });
      setFilters((f) => ({ ...f, priceMin: min, priceMax: max }));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const result = allProducts.filter((p) => {
      const matchCat = filters.category ? p.category === filters.category : true;
      const matchMin = parseFloat(p.price) >= parseFloat(filters.priceMin);
      const matchMax = parseFloat(p.price) <= parseFloat(filters.priceMax);
      return matchCat && matchMin && matchMax;
    });

    // Ordenamiento
    const sorted = [...result];
    switch (filters.orderBy) {
      case "nameAsc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceAsc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sorted.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredProducts(sorted);
  }, [allProducts, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-900 text-white pt-20 px-4">
      <Header />

      <main className="w-full max-w-none px-4 space-y-10 pb-10">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
          🧾 Listado de Productos
        </h2>

        {/* FILTROS */}
        <div className="w-full bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-4 gap-4 text-white">
  <select
    value={filters.category}
    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
    className="p-2 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-sky-300"
  >
    <option value="" className="text-black">Todas las categorías</option>
    {categories.map((cat, idx) => (
      <option key={idx} value={cat} className="text-black">{cat}</option>
    ))}
  </select>

  <div className="flex flex-col">
    <label className="text-sm mb-1">Precio mínimo: ${filters.priceMin}</label>
    <input
      type="range"
      min={priceRange.min}
      max={priceRange.max}
      value={filters.priceMin}
      onChange={(e) => setFilters({ ...filters, priceMin: parseFloat(e.target.value) })}
      className="accent-sky-400"
    />
  </div>

  <div className="flex flex-col">
    <label className="text-sm mb-1">Precio máximo: ${filters.priceMax}</label>
    <input
      type="range"
      min={priceRange.min}
      max={priceRange.max}
      value={filters.priceMax}
      onChange={(e) => setFilters({ ...filters, priceMax: parseFloat(e.target.value) })}
      className="accent-sky-400"
    />
  </div>

  <select
    value={filters.orderBy}
    onChange={(e) => setFilters({ ...filters, orderBy: e.target.value })}
    className="p-2 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-sky-300"
  >
    <option value="" className="text-black">Ordenar por...</option>
    <option value="nameAsc" className="text-black">🔤 Nombre A → Z</option>
    <option value="nameDesc" className="text-black">🔠 Nombre Z → A</option>
    <option value="priceAsc" className="text-black">💰 Precio menor a mayor</option>
    <option value="priceDesc" className="text-black">💵 Precio mayor a menor</option>
  </select>
</div>
        

        {/* TABLA */}
        <ProductTable filters={filters} products={filteredProducts} />

        {/* GRÁFICAS */}
        {filteredProducts.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            <CategoryChart products={filteredProducts} />
            <CategoryPieChart products={filteredProducts} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewProducts;
