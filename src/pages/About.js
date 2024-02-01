import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import styles from "./About.module.css";

function About() {
  const whatsappNumber = "+5583988589918";
  const whatsappMessage = encodeURIComponent(
    "Olá, gostaria de entrar em contato para tirar uma dúvida."
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sobre Nós</h1>
      <p className={styles.description}>
        Bem-vindo à Bluepet, o seu destino completo para o cuidado e bem-estar
        dos seus queridos animais de estimação. Na Bluepet, estamos
        comprometidos em proporcionar uma experiência única para você e seus
        pets, oferecendo uma ampla gama de serviços e produtos de alta
        qualidade.
      </p>

      <p className={styles.description}>
        Na nossa plataforma online, você encontra uma variedade de serviços para
        garantir a saúde e a felicidade do seu pet. Agende consultas com nossos
        experientes veterinários, que estão prontos para oferecer cuidados
        personalizados e orientações para o seu amigo peludo. Oferecemos também
        a conveniência do agendamento de testes, vacinações e exames de sangue,
        garantindo que seu pet receba os cuidados necessários para uma vida
        saudável.
      </p>

      <p className={styles.description}>
        Além dos serviços de saúde, a Bluepet disponibiliza uma seleção
        cuidadosamente escolhida de produtos para atender às necessidades do seu
        pet. De remédios de alta qualidade a brinquedos divertidos e acessórios
        elegantes, nossa loja virtual oferece tudo o que seu animal de estimação
        precisa para viver uma vida plena e feliz.
      </p>

      <p className={styles.description}>
        Sabemos o quanto seu pet significa para você, e é por isso que nos
        esforçamos para tornar a experiência Bluepet não apenas conveniente, mas
        também especial. Estamos aqui para ajudar a fortalecer os laços entre
        você e seu animal de estimação, proporcionando os melhores cuidados e
        produtos disponíveis.
      </p>

      <p className={styles.description}>
        Confie na Bluepet para ser sua parceira em cada etapa da jornada com seu
        pet. Explore nosso site, agende uma consulta, faça suas compras e
        descubra o que faz da Bluepet a escolha preferida para amantes de
        animais em busca do melhor para seus companheiros peludos. Sua jornada
        com a Bluepet começa aqui.
      </p>

      <div className={styles.iconContainer}>
        <a href="https://www.instagram.com/bluepetpb/" className={styles.icon}>
          <FaInstagram />
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          className={styles.icon}
        >
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
}

export default About;
