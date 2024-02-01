// Vacinas.js
import React, { useState, useEffect } from "react";
import styles from "./Vacinas.module.css";
import { TextField, MenuItem, Button } from "@mui/material";

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
      `Olá, gostaria de agendar uma vacina.\n\n` +
      `Nome: ${formData.name}\n` +
      `Nome do Pet: ${formData.petName}\n` +
      `Tipo do Pet: ${formData.petType}\n` +
      `Idade do Pet: ${formData.petAge}\n` +
      `Tipo de Vacina: ${formData.vaccineType}\n` +
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
        formData.testeType &&
        formData.testeDate
      );
    };

    setIsSubmitDisabled(!checkIfFormIsValid());
  }, [formData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Agende uma vacinação</p>
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
            label="Tipo de Vacina"
            name="vaccineType"
            value={formData.vaccineType}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
          <TextField
            type="date"
            label="Data da Vacina"
            name="vaccineDate"
            value={formData.vaccineDate}
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
            Agendar Vacina
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Vacinas;
