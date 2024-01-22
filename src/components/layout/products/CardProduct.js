import React from "react";
import styles from "./CardProduct.module.css";

const CardProduct = ({ medicamento }) => {
  return (
    <div className={styles.container}>
      <img
        src={medicamento.foto}
        alt={medicamento.nome}
        className={styles.imagem}
      />
      <div className={styles.conteudo}>
        {" "}
        <h3>{medicamento.nome}</h3>
        <p>Quantidade: {medicamento.quantidade}</p>
        <p>Preço: {medicamento.preço}</p>
      </div>
    </div>
  );
};

export default CardProduct;
