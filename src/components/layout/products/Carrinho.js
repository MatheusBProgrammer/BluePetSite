import React, { useContext, useEffect, useState } from "react";
import styles from "./Carrinho.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function Carrinho() {
  const { cart } = useContext(CartContext);
  const [listaCarrinho, setListaCarrinho] = useState([]);
  const navigate = useNavigate("/carrinho");

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
          <ul>
            {listaCarrinho.map((item, index) => {
              return (
                <li style={{ listStyle: "none" }} key={index}>
                  {/*                 <img src={item.foto} alt={item.nome} />
                <span>{item.nome.split(" ")[0]}</span> */}
                  <img src={item.foto} alt={item.nome} />
                  &nbsp; &nbsp;
                  <span>
                    {item.nome} <span className={styles.x}>x</span>({item.tipo})
                  </span>
                  <div className={styles.quantidade}>
                    <p>Quantidade: {item.quantidade}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className={styles.bottom}>
        <span>
          {total !== 0 ? <div>Total: R${total.toFixed(2)}</div> : ""}{" "}
        </span>
      </div>
      <div className={styles.botao}>
        {" "}
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/carrinho");
          }}
        >
          ir para o carrinho
        </Button>
      </div>
    </div>
  );
}

export default Carrinho;
