// Vacinas.js
import React, { useState, useEffect } from "react";
import styles from "./Testes.module.css";
import { TextField, MenuItem, Button } from "@material-ui/core";

function Exame() {
  const initialState = {
    name: "",
    petName: "",
    petType: "",
    petAge: "",
    exameDate: "",
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const formatWhatsAppMessage = () => {
    return (
      `Olá, gostaria de agendar um Exame de Sangue.\n\n` +
      `Nome: ${formData.name}\n` +
      `Nome do Pet: ${formData.petName}\n` +
      `Tipo do Pet: ${formData.petType}\n` +
      `Idade do Pet: ${formData.petAge}\n` +
      `Data do exame: ${formData.exameDate}`
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = formatWhatsAppMessage();
    const whatsappNumber = "+559";
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
    setFormData(initialState);
  };
  useEffect(() => {
    const checkIfFormIsValid = () => {
      return (
        formData.name &&
        formData.petName &&
        formData.petType &&
        formData.petAge &&
        formData.testeType &&
        formData.testeDate
      );
    };

    setIsSubmitDisabled(!checkIfFormIsValid());
  }, [formData]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Agende um exame</p>
      </div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Seu Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nome do seu Pet"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Seu pet é um"
            name="petType"
            value={formData.petType}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Cachorro">Cachorro</MenuItem>
            <MenuItem value="Gato">Gato</MenuItem>
            <MenuItem value="Coelho">Coelho</MenuItem>
            <MenuItem value="Hamster">Hamster</MenuItem>
          </TextField>
          <TextField
            label="Idade do Pet"
            name="petAge"
            value={formData.petAge}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            type="date"
            label="Data do Exame"
            name="exameDate"
            value={formData.exameDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ marginTop: "20px", fontSize: "2em", color: "#fff" }}
            disabled={isSubmitDisabled}
          >
            Agendar um Exame
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Exame;
