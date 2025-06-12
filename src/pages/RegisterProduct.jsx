import ProductForm from "../components/ProductForm";
import Header from "../components/Header";


const RegisterProduct = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-900 text-white pt-24 md:pt-32 px-4 flex flex-col items-center justify-start">
      <Header />
      <div className="w-full max-w-xl bg-white bg-opacity-10 backdrop-blur-sm rounded-xl shadow-lg p-8 mt-4">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          📝 Registrar Nuevo Producto
        </h2>
        <ProductForm />
      </div>
    </div>
  );
};

export default RegisterProduct;

