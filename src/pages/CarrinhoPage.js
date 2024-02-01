import React, { useContext, useEffect, useState } from "react";
import styles from "./CarrinhoPage.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../components/context/CartContext";
import { PiDogThin } from "react-icons/pi";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import Modal from "../components/layout/Modal";

function CarrinhoPage() {
  const { cart, removeFromCart, setCart } = useContext(CartContext);

  const [modalVisivel, setModalVisivel] = useState(false);
  const abrirModal = () => {
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  useEffect(() => {}, [cart]);

  const total = cart.reduce(
    (acc, item) =>
      acc +
      (item.quantidadeCarrinho ? item.quantidadeCarrinho : 0) * item.preço,
    0
  );

  const removerUnidade = (item) => {
    // Verifica se a quantidade é maior que 0 antes de reduzir
    if (item.quantidadeCarrinho > 1) {
      setCart((prevcart) => {
        return prevcart.map((produto) =>
          produto.nome === item.nome
            ? { ...produto, quantidadeCarrinho: produto.quantidadeCarrinho - 1 }
            : produto
        );
      });
    } else if (item.quantidadeCarrinho <= 1) {
      alert("Produto retirado do carrinho");
      removeFromCart(item);
    }
  };
  const adicionarUnidade = (item) => {
    if (item.quantidade === item.quantidadeCarrinho) {
      alert("Não há estoque suficiente para adicionar mais desse item!");
      return;
    }
    setCart((prevcart) => {
      return prevcart.map((produto) =>
        produto.nome === item.nome
          ? { ...produto, quantidadeCarrinho: produto.quantidadeCarrinho + 1 }
          : produto
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.cabecalho}>
        <p>
          <span>Meu Carrinho</span>
          <FaShoppingCart />
        </p>
      </div>
      {cart.length > 0 && (
        <div className={styles.container2}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.foto} alt={item.nome} />
                    &nbsp; &nbsp;
                    <span className={styles.nomeItem}>{item.nome} </span>
                    <span className={styles.tipo}>({item.tipo})</span>
                  </td>
                  <td>R${item.preço}</td>

                  <td>
                    <div className={styles.quantidade}>
                      <p>{item.quantidadeCarrinho}</p>
                      <div className={styles.quantidadeSelect}>
                        {" "}
                        <button
                          className={styles.removerItem}
                          onClick={() => removerUnidade(item)}
                        >
                          <IoIosRemove />
                        </button>
                        <button
                          className={styles.adicionarItem}
                          onClick={() => adicionarUnidade(item)}
                        >
                          <IoIosAdd />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.removeButton}>
                      {" "}
                      <button
                        onClick={() => {
                          removeFromCart(item);
                        }}
                      >
                        Remover produto
                      </button>
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
          <div className={styles.bottomItems}>
            {" "}
            <button
              onClick={() => {
                if (modalVisivel) {
                  fecharModal();
                } else {
                  abrirModal();
                }
              }}
            >
              Soliticar produtos &nbsp;
              <MdOutlineMarkUnreadChatAlt />
            </button>
            <span>
              {total !== 0 ? <div>Total: R${total.toFixed(2)}</div> : ""}{" "}
            </span>
          </div>
        </div>
      ) : (
        <h2>
          Seu carrinho está vazio! <PiDogThin />{" "}
        </h2>
      )}
      {modalVisivel && (
        <Modal cart={cart} preçoTotal={total} funcao={fecharModal} />
      )}
    </div>
  );
}

export default CarrinhoPage;
