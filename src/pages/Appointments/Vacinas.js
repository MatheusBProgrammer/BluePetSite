// Vacinas.js
import React, { useState, useEffect } from "react";
import styles from "./Vacinas.module.css";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";

function Vacinas() {
  const initialState = {
    name: "",
    petName: "",
    petType: "",
    petAge: "",
    vaccineType: "",
    vaccineDate: "",
  };

  const opcoesVacinas = [
    { tipo: ["Gato", "Cachorro"], vacina: "Antirábica Importada" },
    { tipo: ["Cachorro"], vacina: "Antiviral V10" },
    { tipo: ["Gato"], vacina: "Antiviral V5" },
  ];

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const formatWhatsAppMessage = () => {
    return (
      `Olá, gostaria de agendar uma vacina.

` +
      `Nome: ${formData.name}
` +
      `Nome do Pet: ${formData.petName}
` +
      `Tipo do Pet: ${formData.petType}
` +
      `Idade do Pet: ${formData.petAge}
` +
      `Tipo de Vacina: ${formData.vaccineType}
` +
      `Data da Vacina: ${formData.vaccineDate}`
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
        formData.vaccineType &&
        formData.vaccineDate
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
          Vacinação Pet
        </Typography>
        <Typography
          variant="subtitle1"
          className={styles.subHeaderTitle}
          gutterBottom
        >
          Agende uma vacinação para o seu pet
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
                label="Tipo de Vacina"
                name="vaccineType"
                value={formData.vaccineType}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                select
              >
                {opcoesVacinas.filter((item) =>
                  item.tipo.includes(formData.petType)
                ).length > 0 ? (
                  opcoesVacinas
                    .filter((item) => item.tipo.includes(formData.petType))
                    .map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.vacina}>
                          {item.vacina}
                        </MenuItem>
                      );
                    })
                ) : (
                  <MenuItem key={"Empty"} value={"Sem vacina disponível"}>
                    Sem Vacina disponível
                  </MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                label="Data da Vacina"
                name="vaccineDate"
                value={formData.vaccineDate}
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
                Agendar Vacina
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default Vacinas;
