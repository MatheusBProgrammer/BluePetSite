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
      <img src={logo} alt="logo-png" />
      <div className={styles.contact}>
        <section>
          <p>
            <div
              className={styles.phoneNumber}
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
                )
              }
            >
              {" "}
              <FaWhatsapp />
              &nbsp; 83-9-8858-9918
            </div>
          </p>
          <p>
            <div
              className={styles.instagram}
              onClick={() =>
                window.open("https://www.instagram.com/bluepetpb/")
              }
            >
              <FaInstagram />
              &nbsp; Bluepetpb
            </div>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Logo;
