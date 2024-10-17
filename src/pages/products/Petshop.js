// pages/Petshop.js

import React, { useEffect, useState, useContext } from "react";
import styles from "./Petshop.module.css";
import CardProduct from "../../components/layout/products/CardProduct";
import Carrinho from "../../components/layout/products/Carrinho";
import { CartContext } from "../../components/context/CartContext";
import LoadingSpinner from "../../components/layout/LoadingSpinner";

function Petshop() {
  const [produtosPetshop, setProdutosPetshop] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart, addToCart } = useContext(CartContext);
  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://backendbluepet.vercel.app/api/products"
      );
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }
      const data = await response.json();
      const petshopProducts = data.products.filter(
        (product) => product.type === "petshop"
      );
      setProdutosPetshop(petshopProducts);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
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
          ) : produtosPetshop && produtosPetshop.length > 0 ? (
            produtosPetshop.map((produto) => (
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
              Nenhum produto disponível no momento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Petshop;
