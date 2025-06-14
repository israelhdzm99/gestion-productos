import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import RegisterProduct from "./pages/RegisterProduct";
import ViewProducts from "./pages/ViewProducts";
import EditProduct from "./pages/EditProduct";
import EstadisticasDashboard from "./pages/EstadisticasDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrar" element={<RegisterProduct />} />
        <Route path="/consultar" element={<ViewProducts />} />
        <Route path="/editar/:id" element={<EditProduct />} />
        <Route path="/estadisticas" element={<EstadisticasDashboard />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2500} />
    </Router>
  );
}

export default App;
