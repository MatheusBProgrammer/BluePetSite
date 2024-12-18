// components/layout/products/CardProduct.js

import React from "react";
import { FaCartPlus } from "react-icons/fa6";
import { FaPaw } from "react-icons/fa";

import styles from "./CardProduct.module.css";

const CardProduct = ({ medicamento, funcaoCarrinho }) => {
  return (
    <div
      className={styles.container}
      onClick={() => funcaoCarrinho(medicamento)}
    >
      <img
        src={medicamento.foto}
        alt={medicamento.nome}
        className={styles.imagem}
      />
      <div className={styles.conteudo}>
        <h3>{medicamento.nome}</h3>
        <div className={styles.informacoes}>
          <p>Preço: R${medicamento.preço}</p>
        </div>

        <div className={styles.button}>
          <FaPaw />
          <div className={styles.buttonInfo}>
            <span>1x</span> {medicamento.nome}
          </div>
          <FaCartPlus /> <span>Adicionar ao carrinho</span>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
