import React from "react";
import styles from "./hotelpet.module.css";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";

function HotelPet() {
  const initialState = {
    name: "",
    address: {
      city: "",
      street: "",
      neighborhood: "",
      houseNumber: "",
    },
    petName: "",
    petType: "",
    checkInDate: "",
    checkOutDate: "",
    additionalNotes: "",
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    if (event.target.name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [event.target.name]: event.target.value,
        },
      });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const formatWhatsAppMessage = () => {
    return (
      `Olá, gostaria de agendar uma estadia para meu pet no hotel pet.

` +
      `Nome: ${formData.name}
` +
      `Endereço: ${formData.address.city}, ${formData.address.street}, ${formData.address.neighborhood}, ${formData.address.houseNumber}
` +
      `Nome do Pet: ${formData.petName}
` +
      `Tipo do Pet: ${formData.petType}
` +
      `Data de Check-in: ${formData.checkInDate}
` +
      `Data de Check-out: ${formData.checkOutDate}
` +
      `Notas Adicionais: ${formData.additionalNotes}`
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
        formData.checkInDate &&
        formData.checkOutDate
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
          Hotel Pet
        </Typography>
        <Typography
          variant="subtitle1"
          className={styles.subHeaderTitle}
          gutterBottom
        >
          Agende a estadia do seu pet com conforto
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cidade"
                name="city"
                value={formData.address.city}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bairro"
                name="neighborhood"
                value={formData.address.neighborhood}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Nome da Rua"
                name="street"
                value={formData.address.street}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Número da Casa"
                name="houseNumber"
                value={formData.address.houseNumber}
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
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Data de Check-in"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Data de Check-out"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notas Adicionais"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
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
                Agendar Estadia
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default HotelPet;
