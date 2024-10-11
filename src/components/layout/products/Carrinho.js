// components/layout/products/Carrinho.js

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

  useEffect(() => {}, [cart]);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <FaShoppingCart className={styles.cartIcon} />
        <span>Meu Carrinho</span>
      </div>
      {cart.length > 0 ? (
        <div className={styles.cartItems}>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className={styles.cartItem}>
                <img
                  src={item.foto}
                  alt={item.nome}
                  className={styles.cartImage}
                />
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>
                    {item.nome} ({item.tipo})
                  </span>
                  <p className={styles.itemQuantity}>
                    Quantidade: {item.quantidadeCarrinho}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.emptyCart}>Seu carrinho está vazio.</p>
      )}
      {total > 0 && (
        <div className={styles.cartTotal}>
          Total: R$ {Number(total).toFixed(2)}
        </div>
      )}
      <div className={styles.checkoutButton}>
        <Link to="/carrinho">Ir para o Carrinho</Link>
      </div>
    </div>
  );
}

export default Carrinho;
