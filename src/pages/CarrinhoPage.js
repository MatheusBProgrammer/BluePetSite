// CarrinhoPage.js - Componente React Modernizado
import React, { useContext, useState } from "react";
import styles from "./CarrinhoPage.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../components/context/CartContext";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import Modal from "../components/layout/Modal";

function CarrinhoPage() {
  const { cart, removeFromCart, setCart } = useContext(CartContext);
  const [modalVisivel, setModalVisivel] = useState(false);

  const abrirModal = () => setModalVisivel(true);
  const fecharModal = () => setModalVisivel(false);

  const total = cart.reduce(
    (acc, item) => acc + (item.quantidadeCarrinho || 0) * item.preço,
    0
  );

  const ajustarQuantidade = (item, incremento) => {
    setCart((prevCart) =>
      prevCart.map((produto) =>
        produto.nome === item.nome
          ? {
              ...produto,
              quantidadeCarrinho: produto.quantidadeCarrinho + incremento,
            }
          : produto
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Meu Carrinho</h2>
        <FaShoppingCart className={styles.cartIcon} />
      </div>

      {cart.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.foto}
                    alt={item.nome}
                    className={styles.productImage}
                  />
                  <span>
                    {item.nome} ({item.tipo})
                  </span>
                </td>
                <td>R${item.preço.toFixed(2)}</td>
                <td>
                  <div className={styles.quantity}>
                    <button
                      onClick={() => ajustarQuantidade(item, -1)}
                      disabled={item.quantidadeCarrinho <= 1}
                    >
                      <IoIosRemove />
                    </button>
                    <span>{item.quantidadeCarrinho}</span>
                    <button onClick={() => ajustarQuantidade(item, 1)}>
                      <IoIosAdd />
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.emptyCart}>Seu carrinho está vazio.</p>
      )}

      <div className={styles.footer}>
        <span>Total: R${total.toFixed(2)}</span>
        <button onClick={abrirModal} className={styles.requestButton}>
          Solicitar produtos <MdOutlineMarkUnreadChatAlt />
        </button>
      </div>

      {modalVisivel && (
        <Modal cart={cart} preçoTotal={total} funcao={fecharModal} />
      )}
    </div>
  );
}

export default CarrinhoPage;
