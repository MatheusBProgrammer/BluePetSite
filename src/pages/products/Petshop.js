import styles from "./Petshop.module.css";
import { useContext } from "react";
import CardProduct from "../../components/layout/products/CardProduct";
import cachorro from "../../imgs/petshop/cachorro.png";
import pato from "../../imgs/petshop/pato.png";
import porco from "../../imgs/petshop/porco.png";
import sapo from "../../imgs/petshop/sapo.png";
import tartaruga from "../../imgs/petshop/tartaruga.png";
import Carrinho from "../../components/layout/products/Carrinho";
import { CartContext } from "../../components/context/CartContext";

function Petshop() {
  const produtosPetshop = [
    {
      nome: "Pato Pelúcia Premium",
      quantidade: 1,
      tipo: "unidade",
      foto: pato,
      preço: 29.49,
    },
    {
      nome: "Porco Pelúcia Premium",
      quantidade: 1,
      tipo: "unidade",
      foto: porco,
      preço: 29.49,
    },
    {
      nome: "Cachorro Pelúcia Premium",
      quantidade: 1,
      tipo: "unidade",
      foto: cachorro,
      preço: 38.49,
    },

    {
      nome: "Sapo Pelúcia Premium",
      quantidade: 1,
      tipo: "unidade",
      foto: sapo,
      preço: 38.49,
    },
    {
      nome: "Tartaruga Pelúcia Premium",
      quantidade: 1,
      tipo: "unidade",
      foto: tartaruga,
      preço: 45.49,
    },
  ];

  const { cart, addToCart } = useContext(CartContext);

  return (
    <div className={styles.page}>
      {cart.length > 0 && <Carrinho />}
      <div className={styles.container}>
        {produtosPetshop.map((produto, index) => (
          <CardProduct
            key={index}
            medicamento={produto}
            funcaoCarrinho={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
export default Petshop;
