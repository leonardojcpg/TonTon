import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Header } from "../../Components/Header";

export const BreastFeeding = () => {
  const [feedTime, setFeedTime] = useState(0);
  const [breastSide, setBreastSide] = useState("");
  const [feed, setFeed] = useState([]);
  const [feedHour, setFeedHour] = useState("");

  const addFeed = () => {
    if (feedTime && breastSide && feedHour) {
      const newFeedEntry = { time: feedTime, side: breastSide, hour: feedHour };
      setFeed([...feed, newFeedEntry]);
      setFeedTime("");
      setBreastSide("");
      setFeedHour("");
    } else {
      console.log(`Dados de alimentação inválidos: feedTime = ${feedTime}, breastSide = ${breastSide}, hour = ${feedHour}`);
    }
  };

  const incrementFeedTime = () => {
    setFeedTime((prevFeedTime) => prevFeedTime + 5);
  };

  const decrementFeedTime = () => {
    if (feedTime >= 5) {
      setFeedTime((prevFeedTime) => prevFeedTime - 5);
    }
  };

  return (
    <>
      <Header />
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between", 
        }}
      >
        {/* Coluna esquerda */}
        <div style={{ flex: 1 }}>
          <Paper
            elevation={3}
            style={{
              padding: "1rem",
              height: "100vh",
              width: "100%"
            }}
          >
            <Typography variant="h4" style={{ textAlign: "center", marginBottom: "1rem", margin: "1rem" }}>
              Breast-Feeding
            </Typography>

            <Typography variant="h6">Feeding-Time</Typography>
            <div style={{ display: "flex", alignItems: "center"}}>
              <Button
                variant="contained"
                color="primary"
                onClick={decrementFeedTime}
                sx={{
                  marginTop: 1,
                  backgroundColor: "#508b50",
                  "&:hover": {
                    backgroundColor: "#a4dfa4",
                    borderColor: "#a4dfa4",
                    color: "#508b50",
                  },
                }}
              >
                -
              </Button>
              <TextField
                style={{ width: "6.25rem", margin: "0 0.625rem" }}
                variant="outlined"
                type="number"
                value={feedTime}
                onChange={(e) => setFeedTime(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={incrementFeedTime}
                sx={{
                  marginTop: 1,
                  backgroundColor: "#508b50",
                  "&:hover": {
                    backgroundColor: "#a4dfa4",
                    borderColor: "#a4dfa4",
                    color: "#508b50",
                  },
                }}
              >
                +
              </Button>
            </div>
            <Typography variant="h6">Breast-Side</Typography>
            <Select
              style={{ width: "250px" }}
              label="Breast Side"
              variant="outlined"
              value={breastSide}
              onChange={(e) => setBreastSide(e.target.value)}
            >
              <MenuItem value="left">Left</MenuItem>
              <MenuItem value="right">Right</MenuItem>
            </Select>
            <Typography variant="h6">Feeding Hour</Typography>
            <TextField
              style={{ width: "250px" }}
              label="Hour"
              variant="outlined"
              value={feedHour}
              onChange={(e) => setFeedHour(e.target.value)}
            />
            <Button
              style={{ display: "flex", width: "250px" }}
              variant="contained"
              color="primary"
              onClick={() => {
                addFeed()
              }}
              sx={{
                marginTop: 1,
                backgroundColor: "#508b50",
                "&:hover": {
                  backgroundColor: "#a4dfa4",
                  borderColor: "#a4dfa4",
                  color: "#508b50",
                },
              }}
            >
              Add Feeding
            </Button>
          </Paper>
        </div>
        
        {/* Coluna direita */}
        <div style={{ flex: 0.70 }}>
          <Paper
            elevation={3}
            style={{
              padding: "1rem",
              height: "100vh",
              width: "100%",
            }}
          >
            <Typography variant="h5" style={{ margin: "1rem" }}>Feeding Details:</Typography>
            <List>
              {feed.map((entry, index) => (
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
                  <ListItemText
                    primary={`Time: ${entry.time} minutes`}
                    secondary={
                      <>
                        Breast-Side: {entry.side}
                        <br />
                        Hour: {entry.hour}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      </Container>
    </>
  );
};
