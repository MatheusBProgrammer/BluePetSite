// Testes.js
import React, { useState, useEffect } from "react";
import styles from "./Testes.module.css";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";

function Testes() {
  const initialState = {
    name: "",
    petName: "",
    petType: "",
    petAge: "",
    testeType: "",
    testeDate: "",
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const formatWhatsAppMessage = () => {
    return (
      `Olá, gostaria de agendar um teste rápido.

` +
      `Nome: ${formData.name}
` +
      `Nome do Pet: ${formData.petName}
` +
      `Tipo do Pet: ${formData.petType}
` +
      `Idade do Pet: ${formData.petAge}
` +
      `Tipo de Teste: ${formData.testeType}
` +
      `Data do Teste: ${formData.testeDate}`
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = formatWhatsAppMessage();
    const whatsappNumber = "+5583988589918";
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
      <Box className={styles.formContainer}>
        <Typography
          variant="h4"
          component="h1"
          className={styles.headerTitle}
          gutterBottom
        >
          Testes Rápidos Pet
        </Typography>
        <Typography
          variant="subtitle1"
          className={styles.subHeaderTitle}
          gutterBottom
        >
          Agende um teste rápido para o seu pet
        </Typography>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Seu Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nome do seu Pet"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Tipo de Pet"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="Cachorro">Cachorro</MenuItem>
                <MenuItem value="Gato">Gato</MenuItem>
                <MenuItem value="Coelho">Coelho</MenuItem>
                <MenuItem value="Hamster">Hamster</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Idade do Pet"
                name="petAge"
                value={formData.petAge}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tipo de Teste"
                name="testeType"
                value={formData.testeType}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                select
              >
                <MenuItem value="Erlichiose">Erlichiose</MenuItem>
                <MenuItem value="Fiv/Felv">Fiv/Felv</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                label="Data do Teste"
                name="testeDate"
                value={formData.testeDate}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                style={{ fontSize: "1.2em", padding: "10px 0" }}
                disabled={isSubmitDisabled}
              >
                Agendar Teste Rápido
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default Testes;
