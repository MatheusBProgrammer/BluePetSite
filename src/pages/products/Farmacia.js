// pages/Farmacia.js

import React, { useEffect, useState, useContext } from "react";
import styles from "./Farmacia.module.css";
import CardProduct from "../../components/layout/products/CardProduct";
import Carrinho from "../../components/layout/products/Carrinho";
import { CartContext } from "../../components/context/CartContext";
import LoadingSpinner from "../../components/layout/LoadingSpinner";

function Farmacia() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const fetchMedicamentos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://backendbluepet.vercel.app/api/products"
      );
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }
      const data = await response.json();
      const farmaciaProducts = data.products.filter(
        (product) => product.type === "farmacia"
      );
      setMedicamentos(farmaciaProducts);
    } catch (error) {
      console.error("Erro ao buscar medicamentos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        {/* Carrinho será exibido à direita ou no topo em dispositivos móveis */}
        {cart && cart.length > 0 && <Carrinho />}

        <div className={styles.container}>
          {isLoading ? (
            <div className="loading">
              <LoadingSpinner />
            </div>
          ) : medicamentos && medicamentos.length > 0 ? (
            medicamentos.map((produto) => (
              <CardProduct
                key={produto._id}
                medicamento={{
                  foto: produto.imageUrl,
                  nome: produto.name,
                  tipo: produto.type,
                  quantidade: produto.quantity,
                  preço: produto.price || "Indisponível",
                }}
                funcaoCarrinho={addToCart}
              />
            ))
          ) : (
            <div className={styles.noProducts}>
              Nenhum medicamento disponível no momento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Farmacia;
