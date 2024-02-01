import React, { useContext, useState, useEffect } from "react";
import styles from "./Modal.module.css";
import { TextField, Button } from "@mui/material";
import { CartContext } from "../context/CartContext";
import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = ({ cart, preçoTotal, funcao }) => {
  // Verificação se todos os campos do formulário estão preenchidos
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [cliente, setCliente] = useState({
    nome: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
  });

  const { setCart } = useContext(CartContext);
  const total = preçoTotal;

  const fecharModal = () => funcao();

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setCliente((prevCliente) => {
      return { ...prevCliente, [name]: value };
    });
  };

  const formatWhatsAppMessage = () => {
    return (
      `Olá, gostaria realizar uma *COMPRA*.\n` +
      `Nome: *${cliente.nome}*,\n` +
      `Endereço: *${cliente.cidade}, ${cliente.bairro}, ${cliente.rua}, ${cliente.numero}*,\n` +
      `Meu pedido é : \n ${cart.map((item, index) => {
        return `${item.quantidadeCarrinho} - ${item.nome}`;
      })}\n` +
      `*No total de: ${total.toFixed(2) + 6}*\n`
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const message = formatWhatsAppMessage();
    const whatsappNumber = "+5583988589918";
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;
    await window.open(whatsappURL, "_blank");
    setCart([]);
    fecharModal();
    alert("Pedido Concluido");
  };
  useEffect(() => {
    const checkIfFormIsValid = () => {
      return (
        cliente.nome &&
        cliente.cidade &&
        cliente.rua &&
        cliente.bairro &&
        cliente.numero
      );
    };

    setIsSubmitDisabled(!checkIfFormIsValid());
  }, [cliente]);
  return (
    <div className={styles.modal}>
      <div className={styles.modalBox}>
        <div className={styles.close} onClick={() => funcao()}>
          <IoCloseCircleOutline />
        </div>{" "}
        <div className={styles.modalContent}>
          <p>
            Sua compra deu um total de: R${total.toFixed(2)} (Obs: Taxa de
            entrega: R$6).
          </p>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <TextField
              className={styles.nome}
              label="Nome"
              variant="outlined"
              fullWidth
              margin="normal"
              name="nome" // Corrigido para usar name
              value={cliente.nome}
              onChange={handleOnChange}
            />
            <TextField
              label="Cidade"
              variant="outlined"
              fullWidth
              margin="normal"
              name="cidade" // Corrigido para usar name
              value={cliente.endereço}
              onChange={handleOnChange}
            />
            <TextField
              label="Bairro"
              variant="outlined"
              fullWidth
              margin="normal"
              name="bairro" // Corrigido para usar name
              value={cliente.endereço}
              onChange={handleOnChange}
            />
            <TextField
              label="Rua"
              variant="outlined"
              fullWidth
              margin="normal"
              name="rua" // Corrigido para usar name
              value={cliente.endereço}
              onChange={handleOnChange}
            />
            <TextField
              label="Número"
              variant="outlined"
              fullWidth
              margin="normal"
              name="numero" // Corrigido para usar name
              value={cliente.endereço}
              onChange={handleOnChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitDisabled}
            >
              Concluir pedido via WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
