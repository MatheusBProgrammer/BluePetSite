import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Logo from "./components/layout/Logo";
import Consultas from "./pages/Appointments/Consultas";
import Vacinas from "./pages/Appointments/Vacinas";
import Testes from "./pages/Appointments/Testes";
import Exame from "./pages/Appointments/Exame";
import Farmacia from "./pages/products/Farmacia";
import Petshop from "./pages/products/Petshop";
import CarrinhoPage from "./pages/CarrinhoPage";

function App() {
  return (
    <div className="App">
      <Logo />
      <BrowserRouter>
        <Navbar />
        <RoutesWithTransitions />
      </BrowserRouter>
    </div>
  );
}

function RoutesWithTransitions() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/about" element={<About />} />
          <Route path="/vacinas" element={<Vacinas />} />
          <Route path="/testes" element={<Testes />} />
          <Route path="/exame" element={<Exame />} />
          <Route path="/farmacia" element={<Farmacia />} />
          <Route path="/petshop" element={<Petshop />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
