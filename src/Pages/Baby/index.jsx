import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Input,
} from "@mui/material";

import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";

export const BabyInfo = () => {
  const [babyName, setBabyName] = useState("");
  const [babyGender, setBabyGender] = useState("");
  const [babyHeight, setBabyHeight] = useState("");
  const [babyWeight, setBabyWeight] = useState("");
  const [babyBirthDate, setBabyBirthDate] = useState("");
  const [babyAgeMonths, setBabyAgeMonths] = useState("");
  const [babyPhoto, setBabyPhoto] = useState("");
  const [babyList, setBabyList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAddBaby = () => {
    if (
      babyName &&
      babyGender &&
      babyHeight &&
      babyWeight &&
      babyBirthDate &&
      babyAgeMonths &&
      babyPhoto
    ) {
      const newBaby = {
        name: babyName,
        gender: babyGender,
        height: babyHeight,
        weight: babyWeight,
        birthDate: babyBirthDate,
        ageMonths: babyAgeMonths,
        photo: babyPhoto,
      };

      setBabyList([...babyList, newBaby]);
      // Limpar os campos após adicionar o bebê
      setBabyName("");
      setBabyGender("");
      setBabyHeight("");
      setBabyWeight("");
      setBabyBirthDate("");
      setBabyAgeMonths("");
      setBabyPhoto("");
      setSelectedFile(null);
    } else {
      console.log("Por favor, preencha todos os campos.");
    }
  };

/*   const calculateAgeMonths = () => {
    // Lógica para calcular a idade em meses com base na data de nascimento
    // Você pode implementar isso conforme necessário
  }; */

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedPhotoDataUrl = e.target.result;
        setBabyPhoto(uploadedPhotoDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Baby" />
      <Paper elevation={3} style={{ width: "100%", height: "100vh" }}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Grid container spacing={3} style={{ margin: "1rem", marginLeft: "3rem" }}>
            {/* Coluna da esquerda para os campos do bebê */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Baby Information</Typography>
              <TextField
                label="Name"
                variant="outlined"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Select
                label="Gender"
                variant="outlined"
                value={babyGender}
                onChange={(e) => setBabyGender(e.target.value)}
                fullWidth
                margin="normal"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              <TextField
                label="Height (cm)"
                variant="outlined"
                type="number"
                value={babyHeight}
                onChange={(e) => setBabyHeight(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Weight (kg)"
                variant="outlined"
                type="number"
                value={babyWeight}
                onChange={(e) => setBabyWeight(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Birth Date"
                variant="outlined"
                type="date"
                value={babyBirthDate}
                onChange={(e) => setBabyBirthDate(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Age (Months)"
                variant="outlined"
                type="number"
                value={babyAgeMonths}
                onChange={(e) => setBabyAgeMonths(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Input
                type="file"
                accept="image/*"
                id="baby-photo-input"
                style={{ display: "none" }}
                onChange={handleFileChange}
                value={selectedFile}
              />
              <label htmlFor="baby-photo-input">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  fullWidth
                  margin="normal"
                >
                  Upload Photo
                </Button>
              </label>
              {babyPhoto && (
                <img
                  src={babyPhoto}
                  alt="Baby"
                  style={{ maxWidth: "100%", marginTop: "1rem" }}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddBaby}
                fullWidth
                margin="normal"
              >
                Add Baby
              </Button>
            </Grid>
            {/* Coluna da direita para a lista de bebês */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Baby List</Typography>
              <List style={{ maxHeight: "50vh", overflowY: "auto" }}>
                {babyList.map((baby, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      marginBottom: "0.5rem",
                      padding: "0.5rem",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <img
                      src={baby.photo}
                      alt={baby.name}
                      style={{ maxWidth: "100px", marginRight: "1rem" }}
                    />
                    <ListItemText
                      primary={`Name: ${baby.name}`}
                      secondary={`Gender: ${baby.gender}, Height: ${baby.height} cm, Weight: ${baby.weight} kg, Age (Months): ${baby.ageMonths}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};
