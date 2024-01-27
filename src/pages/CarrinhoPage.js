import React, { useContext, useEffect, useState } from "react";
import styles from "./CarrinhoPage.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../components/context/CartContext";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { PiDogThin } from "react-icons/pi";

function CarrinhoPage() {
  const { cart } = useContext(CartContext);
  const [listaCarrinho, setListaCarrinho] = useState([]);

  const total =
    cart.length > 0
      ? cart
          .map((item) => Number(item.preço))
          .reduce((total, quantidade) => total + quantidade)
      : 0;

  useEffect(() => {
    // Função para atualizar a lista de produtos no carrinho
    const atualizarListaCarrinho = () => {
      // Cria uma nova lista vazia para armazenar produtos únicos e suas quantidades
      const novaListaCarrinho = [];

      // Itera sobre cada produto no carrinho
      cart.forEach((element) => {
        // Verifica se o produto já existe na nova lista pelo nome
        const produtoExistente = novaListaCarrinho.find(
          (item) => item.nome === element.nome
        );

        // Se o produto já existe na nova lista
        if (produtoExistente) {
          // Incrementa a quantidade do produto existente
          produtoExistente.quantidade += 1;
        } else {
          // Se o produto não existe na nova lista, adiciona com quantidade 1
          novaListaCarrinho.push({
            foto: element.foto,
            nome: element.nome,
            tipo: element.tipo,
            preco: element.preço,
            quantidade: 1,
          });
        }
      });

      // Atualiza o estado com a nova lista de produtos no carrinho
      setListaCarrinho(novaListaCarrinho);
    };

    // Chama a função de atualização quando o carrinho é modificado
    // (o array de dependências [cart] garante que a função seja chamada quando o carrinho é alterado)
    atualizarListaCarrinho();
  }, [cart]);

  return (
    <div className={styles.container}>
      <div className={styles.cabecalho}>
        <p>
          <span>Meu Carrinho</span>
          <FaShoppingCart />
        </p>
      </div>
      {listaCarrinho.length > 0 && (
        <div className={styles.container2}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {listaCarrinho.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.foto} alt={item.nome} />
                    &nbsp; &nbsp;
                    <span>
                      {item.nome} <span className={styles.x}>x</span>(
                      {item.tipo})
                    </span>
                  </td>
                  <td>{item.preco}</td>

                  <td>
                    <div className={styles.quantidade}>
                      <p>{item.quantidade}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cart.length > 0 ? (
        <div className={styles.bottom}>
          <div>
            {" "}
            <button
              onClick={() => {
                console.log("botao");
              }}
            >
              {" "}
              Soliticar produtos
            </button>
          </div>
          <span>
            {total !== 0 ? <div>Total: R${total.toFixed(2)}</div> : ""}{" "}
          </span>
        </div>
      ) : (
        <h2>
          Seu carrinho está vazio! <PiDogThin />{" "}
        </h2>
      )}
    </div>
  );
}

export default CarrinhoPage;
