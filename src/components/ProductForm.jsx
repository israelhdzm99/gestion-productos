// src/components/ProductForm.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCheck, FaList } from "react-icons/fa";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    rating: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const labels = {
    name: "Nombre",
    category: "Categoría",
    price: "Precio",
    rating: "Calificación",
    stock: "Stock",
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido.";
    if (!formData.category.trim()) newErrors.category = "La categoría es requerida.";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Ingresa un precio válido mayor a 0.";
    if (!formData.rating || formData.rating < 1 || formData.rating > 5)
      newErrors.rating = "La calificación debe ser entre 1 y 5.";
    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0)
      newErrors.stock = "El stock debe ser un número válido.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    await addDoc(collection(db, "products"), {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      stock: parseInt(formData.stock),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    Swal.fire({
      icon: "success",
      title: "Producto registrado exitosamente ✅",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#3B82F6",
    }).then(() => {
      setFormData({ name: "", category: "", price: "", rating: "", stock: "" });
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Ocurrió un error",
      text: "No se pudo registrar el producto.",
    });
    console.error("Error:", error);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
  {Object.keys(labels).map((field) => (
    <div key={field}>
  {field === "price" ? (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white opacity-80 text-sm">$</span>
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
        className="w-full pl-7 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      {errors.price && (
        <p className="text-red-500 text-sm mt-1">{errors.price}</p>
      )}
    </div>
  ) : (
    <div>
      <input
        name={field}
        placeholder={labels[field]}
        type={["rating", "stock"].includes(field) ? "number" : "text"}
        step={field === "rating" ? "1" : "1"}
        min={field === "rating" ? 1 : 0}
        max={field === "rating" ? 5 : undefined}
        value={formData[field]}
        onChange={handleChange}
        className="w-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  )}
</div>
  ))}

  <div className="flex flex-col md:flex-row gap-4 pt-4">
    <button
      type="submit"
      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex justify-center items-center gap-2 transition"
    >
      <FaCheck /> Registrar Producto
    </button>
  </div>
</form>

  );
};

export default ProductForm;
