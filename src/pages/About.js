import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import styles from "./About.module.css";
import catdog from "../imgs/catdog.png"; // Ajuste o caminho conforme necessário

function About() {
  const whatsappNumber = "+5583988589918";
  const whatsappMessage = encodeURIComponent(
    "Olá, gostaria de entrar em contato para tirar uma dúvida."
  );

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Bluepet</h1>
        <p className={styles.heroSubtitle}>
          Cuidando dos seus amigos de quatro patas com carinho e dedicação
        </p>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.imageContainer}>
          <img
            src={catdog}
            alt="Sobre nós - Bluepet"
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Sobre Nós</h2>
          <p className={styles.description}>
            Bem-vindo à <span className={styles.highlight}>Bluepet</span>, o seu
            destino completo para o cuidado e bem-estar dos seus queridos
            animais de estimação. Na Bluepet, estamos comprometidos em
            proporcionar uma experiência única para você e seus pets, oferecendo
            uma ampla gama de serviços e produtos de alta qualidade.
          </p>
          <p className={styles.description}>
            Na nossa plataforma online, você encontra uma variedade de serviços
            para garantir a saúde e a felicidade do seu pet. Agende consultas
            com nossos experientes veterinários, que estão prontos para oferecer
            cuidados personalizados e orientações para o seu amigo peludo.
            Oferecemos também a conveniência do agendamento de testes,
            vacinações e exames de sangue, garantindo que seu pet receba os
            cuidados necessários para uma vida saudável.
          </p>
          <p className={styles.description}>
            Além dos serviços de saúde, a{" "}
            <span className={styles.highlight}>Bluepet</span> disponibiliza uma
            seleção cuidadosamente escolhida de produtos para atender às
            necessidades do seu pet. De remédios de alta qualidade a brinquedos
            divertidos e acessórios elegantes, nossa loja virtual oferece tudo o
            que seu animal de estimação precisa para viver uma vida plena e
            feliz.
          </p>
        </div>
      </div>
      <div className={styles.footerSection}>
        <div className={styles.iconContainer}>
          <a
            href="https://www.instagram.com/bluepetpb/"
            className={styles.icon}
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            className={styles.icon}
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
