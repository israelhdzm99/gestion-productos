// src/pages/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    rating: "",
    stock: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        toast.error("Producto no encontrado.");
        navigate("/consultar");
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      ...product,
      price: parseFloat(product.price),
      rating: parseFloat(product.rating),
      stock: parseInt(product.stock)
    });
    Swal.fire({
    title: "✅ Producto actualizado",
    text: "El producto se actualizó correctamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#2563eb" // Azul
  }).then(() => {
    navigate("/consultar");
  });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">✏️ Editar producto</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Categoría</label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Categoría"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Precio</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={product.price}
              onChange={handleChange}
              placeholder="Precio"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Calificación</label>
            <input
              name="rating"
              type="number"
              step="0.1"
              value={product.rating}
              onChange={handleChange}
              placeholder="Calificación"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Stock</label>
            <input
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="col-span-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition"
          >
            Actualizar producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
