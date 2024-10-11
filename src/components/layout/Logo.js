import React from "react";
import logo from "../../imgs/logo.jpg";
import styles from "./Logo.module.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

function Logo() {
  const whatsappNumber = "+5583988589918";
  const whatsappMessage = encodeURIComponent(
    "Olá, gostaria de entrar em contato para tirar uma dúvida."
  );

  return (
    <div className={styles.container}>
      <img src={logo} alt="Blue Pet logo" className={styles.logoImage} />
      <div className={styles.contact}>
        <div
          className={styles.contactItem}
          onClick={() =>
            window.open(
              `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
            )
          }
        >
          <FaWhatsapp className={styles.icon} />
          <span className={styles.text}>83-9-8858-9918</span>
        </div>
        <div
          className={styles.contactItem}
          onClick={() => window.open("https://www.instagram.com/bluepetpb/")}
        >
          <FaInstagram className={styles.icon} />
          <span className={styles.text}>Bluepetpb</span>
        </div>
      </div>
    </div>
  );
}

export default Logo;
