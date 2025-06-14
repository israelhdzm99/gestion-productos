import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const ProductTable = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      await deleteDoc(doc(db, "products", id));
      Swal.fire({
      title: '¡Eliminado!',
      text: 'El producto ha sido eliminado.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    });
    }
  };

  // 🔍 FILTRADO
  const filtered = products.filter((p) => {
    const matchCategory = filters.category
      ? p.category.toLowerCase() === filters.category.toLowerCase()
      : true;
    const matchMin = filters.priceMin ? parseFloat(p.price) >= parseFloat(filters.priceMin) : true;
    const matchMax = filters.priceMax ? parseFloat(p.price) <= parseFloat(filters.priceMax) : true;
    return matchCategory && matchMin && matchMax;
  });

  // ↕️ ORDENAMIENTO
  const sorted = [...filtered].sort((a, b) => {
    switch (filters.orderBy) {
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // 📊 ESTADÍSTICAS
  const total = sorted.length;
  const averagePrice = total > 0
    ? (sorted.reduce((acc, curr) => acc + parseFloat(curr.price), 0) / total).toFixed(2)
    : 0;

  return (
    <div className="space-y-4 w-full">
      {/* Estadísticas */}
      <div className="bg-white bg-opacity-10 text-white p-4 rounded shadow text-sm flex flex-col md:flex-row gap-4 md:justify-between">
        <p><strong>Productos mostrados:</strong> {total}</p>
        <p><strong>Precio promedio:</strong> ${averagePrice}</p>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto w-full">
       <table className="w-full text-sm text-left bg-blue-900 text-white border border-blue-800 rounded-md shadow overflow-hidden">

  <thead className="bg-blue-950 text-white font-semibold border-b border-blue-800">
    <tr>
      <th className="px-4 py-3 border-b border-gray-600">Nombre</th>
      <th className="px-4 py-3 border-b border-gray-600">Categoría</th>
      <th className="px-4 py-3 border-b border-gray-600">Precio</th>
      <th className="px-4 py-3 border-b border-gray-600">Rating</th>
      <th className="px-4 py-3 border-b border-gray-600">Stock</th>
      <th className="px-4 py-3 border-b border-gray-600">Acciones</th>
    </tr>
  </thead>
          <tbody>
  {sorted.map((prod, index) => (
    <tr
      key={prod.id}
      className={`transition-colors duration-200 ${
  index % 2 === 0 ? "bg-blue-900" : "bg-blue-800"
} hover:bg-blue-700`}
    >
      <td className="px-4 py-2">{prod.name}</td>
      <td className="px-4 py-2">{prod.category}</td>
      <td className="px-4 py-2">${parseFloat(prod.price).toLocaleString()}</td>
      <td className="px-4 py-2">{prod.rating}</td>
      <td className="px-4 py-2">{prod.stock}</td>
      <td className="px-4 py-2 space-x-2">
        <button
          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
          onClick={() => navigate(`/editar/${prod.id}`)}
        >
          Editar
        </button>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={() => handleDelete(prod.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  ))}
</tbody>


        </table>
      </div>
    </div>
  );
};

export default ProductTable;
