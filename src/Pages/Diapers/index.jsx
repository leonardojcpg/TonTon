import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Header } from "../../Components/Header";

export const Diapers = () => {
  const [diapersTime, setDiapersTime] = useState("");
  const [diapersType, setDiapersType] = useState("");
  const [diapersQuantity, setDiapersQuantity] = useState("");
  const [diapers, setDiapers] = useState([]);
  const [totalDiapers, setTotalDiapers] = useState({});

  const addDiapers = () => {
    if (diapersTime && diapersType && diapersQuantity) {
      const newDiaperEntry = {
        time: diapersTime,
        type: diapersType,
        quantity: diapersQuantity,
      };
      setDiapers([...diapers, newDiaperEntry]);
      setTotalDiapers((prevTotal) => {
        const newTotal = { ...prevTotal };

        if (!newTotal[diapersType]) {
          newTotal[diapersType] = 0;
        }

        newTotal[diapersType] += parseInt(diapersQuantity, 10);
        return newTotal;
      });
      setDiapersTime("");
      setDiapersType("");
      setDiapersQuantity("");
    }
  };

  return (
    <>
      <Header />
      <Container style={{ display: "flex", flexDirection: "column" }}>
        <Paper
          elevation={3}
          style={{
            flex: 1,
            padding: "1rem",
            position: "relative",
            transform: "translate(0,17%)",
            height: "100vh",
          }}
        >
          <Typography variant="h4">Dashboard</Typography>
          <div>
            <Typography variant="h6">Diapers Control</Typography>
            <Select
              label="Size"
              variant="outlined"
              value={diapersType}
              onChange={(e) => setDiapersType(e.target.value)}
            >
              <MenuItem value="NB">NB</MenuItem>
              <MenuItem value="XS">XS</MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="L">L</MenuItem>
              <MenuItem value="XL">XL</MenuItem>
              <MenuItem value="XXL">XXL</MenuItem>
            </Select>
            <TextField
              label="Quantity"
              variant="outlined"
              type="number"
              value={diapersQuantity}
              onChange={(e) => setDiapersQuantity(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addDiapers}
              sx={{
                marginTop: 1,
                marginLeft: 2,
                backgroundColor: "#508b50",
                "&:hover": {
                  backgroundColor: "#75ca75",
                  borderColor: "#75ca75",
                  color: "#fff",
                },
              }}
            >
              Add
            </Button>
            <List>
              {diapers.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item.time} - ${item.type} - Quantity: ${item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          <div>
            <Typography variant="h6">Total de Fraldas por Tamanho:</Typography>
            <List>
              {Object.keys(totalDiapers).map((size) => (
                <ListItem key={size}>
                  <ListItemText primary={`${size}: ${totalDiapers[size]}`} />
                </ListItem>
              ))}
            </List>
          </div>
        </Paper>
      </Container>
    </>
  );
};
