import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import NavbarDropDownMenu from "./NavbarDropDownMenu";

export default function Navbar() {
  const produtosLinks = {
    name: "Produtos",
    links: [
      { to: "/petshop", nameSession: "Petshop", icon: "🐾" },
      { to: "/farmacia", nameSession: "Farmácia", icon: "💊" },
      { to: "/carrinho", nameSession: "Carrinho", icon: "🛒" },
    ],
  };
  const agendamentoLinks = {
    name: "Agendamentos",
    links: [
      { to: "/consultas", nameSession: "Consultas", icon: "👩‍⚕️" },
      { to: "/vacinas", nameSession: "Vacinas", icon: "💉" },
      { to: "/testes", nameSession: "Testes Rápidos", icon: "🧪" },
      { to: "/exame", nameSession: "Exames de Sangue", icon: "🩸" },
      { to: "/banho", nameSession: "Banho", icon: "🛁" },
      { to: "/hotelpet", nameSession: "Hotel", icon: "🏨" },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link to="/" className={`${styles.linkItem} ${styles.home}`}>
          Início
        </Link>
        <NavbarDropDownMenu object={produtosLinks} />
        <NavbarDropDownMenu object={agendamentoLinks} />
        <Link to="/about" className={`${styles.linkItem} ${styles.about}`}>
          Sobre
        </Link>
      </div>
    </div>
  );
}
