// src/pages/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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
        alert("Producto no encontrado.");
        navigate("/consultar");
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      ...product,
      price: parseFloat(product.price),
      rating: parseFloat(product.rating),
      stock: parseInt(product.stock)
    });
    navigate("/consultar");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ Editar producto</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
        <input name="name" placeholder="Nombre" value={product.name} onChange={handleChange} className="border p-2" required />
        <input name="category" placeholder="Categoría" value={product.category} onChange={handleChange} className="border p-2" required />
        <input name="price" type="number" step="0.01" placeholder="Precio" value={product.price} onChange={handleChange} className="border p-2" required />
        <input name="rating" type="number" step="0.1" placeholder="Calificación" value={product.rating} onChange={handleChange} className="border p-2" required />
        <input name="stock" type="number" placeholder="Stock" value={product.stock} onChange={handleChange} className="border p-2" required />
        <button type="submit" className="col-span-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Actualizar producto</button>
      </form>
    </div>
  );
};

export default EditProduct;

