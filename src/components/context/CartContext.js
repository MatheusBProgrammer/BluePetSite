import React, { createContext, useState } from "react";

// Criação do contexto
export const CartContext = createContext();

// Componente de provedor do contexto
export const CartContextProvider = ({ children }) => {
  // Estado para armazenar o carrinho
  const [cart, setCart] = useState([]);

  // Função para adicionar um item ao carrinho
  const addToCart = (item) => {
    // Verifica se o produto já existe no carrinho
    const produtoExistente = cart.find((produto) => produto.nome === item.nome);

    if (produtoExistente) {
      if (produtoExistente.quantidadeCarrinho === item.quantidade) {
        alert("Não há estoque suficiente para adicionar mais desse item!");
        return;
      }
      setCart((prevCart) =>
        prevCart.map((produto) =>
          produto.nome === item.nome
            ? { ...produto, quantidadeCarrinho: produto.quantidadeCarrinho + 1 }
            : produto
        )
      );
      console.log(produtoExistente.nome);
    } else {
      // Se o produto não existe, adiciona ao carrinho com quantidade 1
      setCart((prevCart) => [...prevCart, { ...item, quantidadeCarrinho: 1 }]);
    }
  };

  const removeFromCart = (produto) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.nome !== produto.nome)
    );
  };
  // Contexto fornecido com o estado do carrinho e a função addToCart
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
