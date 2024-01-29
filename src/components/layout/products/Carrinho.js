import React, { useContext, useEffect } from "react";
import styles from "./Carrinho.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
function Carrinho() {
  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (acc, item) =>
      acc +
      (item.quantidadeCarrinho ? item.quantidadeCarrinho : 0) * item.preço,
    0
  );
  /*   const total2 =
    cart.length > 0
      ? cart
          .map((item) => Number(item.preço))
          .reduce((total, quantidade) => total + quantidade)
      : 0; */

  useEffect(() => {}, [cart]);

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
          <ul>
            {cart.length > 0 &&
              cart.map((item, index) => {
                return (
                  <li style={{ listStyle: "none" }} key={index}>
                    {/*                 <img src={item.foto} alt={item.nome} />
                  <span>{item.nome.split(" ")[0]}</span> */}
                    <img src={item.foto} alt={item.nome} />
                    &nbsp; &nbsp;
                    <span>
                      {item.nome} <span className={styles.x}>x</span>(
                      {item.tipo})
                    </span>
                    <div className={styles.quantidade}>
                      <p>Quantidade: {item.quantidadeCarrinho}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      <div className={styles.bottom}>
        <span>
          {total > 0 ? <div>Total: R${Number(total).toFixed(2)}</div> : ""}{" "}
        </span>
      </div>
      <div className={styles.botao}>
        <Link to="/carrinho"> Ir para o Carrinho</Link>
      </div>
    </div>
  );
}

export default Carrinho;
