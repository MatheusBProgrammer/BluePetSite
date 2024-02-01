import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      © 2024 Matheus Barreto | Desenvolvido por{" "}
      <a
        href="https://github.com/MatheusBProgrammer"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "white", marginLeft: "5px" }}
      >
        MatheusBProgrammer
      </a>
    </div>
  );
}

export default Footer;
