import React, { useContext } from "react";
import styles from "./Farmacia.module.css";
import CardProduct from "../../components/layout/products/CardProduct";
import antitoxico from "../../imgs/farmacia/antitoxico.jpg";
import vermicat from "../../imgs/farmacia/vermicat.jpg";
import chemital from "../../imgs/farmacia/chemital.jpg";
import nausetrat from "../../imgs/farmacia/nausetrat.jpg";
import predvet from "../../imgs/farmacia/predvet.jpg";
import meticorten20 from "../../imgs/farmacia/meticorten20.jpg";
import azium from "../../imgs/farmacia/azium.jpg";
import enronew from "../../imgs/farmacia/enronew.jpg";
import meloxiword from "../../imgs/farmacia/Meloxiword.jpg";
import meticorten5 from "../../imgs/farmacia/meticorten5.jpg";
import Carrinho from "../../components/layout/products/Carrinho";
import { CartContext } from "../../components/context/CartContext";

function Farmacia() {
  const medicamentos = [
    {
      nome: "Vermicat",
      quantidade: 4,
      tipo: "caixa",
      foto: vermicat,
      preço: 17.99,
    },
    {
      nome: "Chemital",
      quantidade: 9,
      tipo: "caixa",
      foto: chemital,
      preço: 19.99,
    },
    {
      nome: "Nausetrat",
      quantidade: 1,
      tipo: "caixa",
      foto: nausetrat,
      preço: 21.99,
    },
    {
      nome: "Antitóxico",
      quantidade: 1,
      tipo: "caixa",
      foto: antitoxico,
      preço: 21.99,
    },
    {
      nome: "Predvet",
      quantidade: 3,
      tipo: "caixa",
      foto: predvet,
      preço: 15.99,
    },
    {
      nome: "Meticorten 20mg prednisona",
      quantidade: 3,
      tipo: "caixa",
      foto: meticorten20,
      preço: 52.99,
    },
    {
      nome: "Azium 0,5mg dexametasona",
      quantidade: 2,
      tipo: "comprimido",
      foto: azium,
      preço: 34.99,
    },
    {
      nome: "Enronew 50mg enrofloxacina",
      quantidade: 9,
      tipo: "cartela",
      foto: enronew,
      preço: 19.99,
    },
    {
      nome: "MeloxiWord 0,5mg meloxicam",
      quantidade: 5,
      tipo: "caixa",
      foto: meloxiword,
      preço: 21.99,
    },
    {
      nome: "Meticorten 5mg prednisona",
      quantidade: 2,
      tipo: "caixa",
      foto: meticorten5,
      preço: 25.99,
    },
  ];

  /*   const [medicamentos, setMedicamentos] = useState([]);
   */ const { cart, addToCart } = useContext(CartContext);

  /*   useEffect(() => {
    // Função para buscar medicamentos da API
    const fetchMedicamentos = async () => {
      try {
        const response = await fetch("http://localhost:3333/products");
        const data = await response.json();
        setMedicamentos(data); // Atualiza o estado local com os medicamentos da API
      } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
      }
    };

    fetchMedicamentos();
  }, []); // */

  return (
    <div className={styles.page}>
      {cart.length > 0 && <Carrinho />}
      <div className={styles.container}>
        {medicamentos.map((produto, index) => (
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

export default Farmacia;
