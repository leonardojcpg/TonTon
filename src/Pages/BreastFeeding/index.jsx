import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Header } from "../../Components/Header";

export const BreastFeeding = () => {
  // feeding
  const [feedTime, setFeedTime] = useState("");
  const [breastSide, setBreastSide] = useState("");
  const [feed, setFeed] = useState([]);
  const [feedHours, setFeedHours] = useState(0);

  const addFeed = () => {
    if (feedTime && breastSide) {
      const newFeedEntry = { time: feedTime, side: breastSide }
      setFeed([...feed, newFeedEntry])
      setFeedTime("")
      setBreastSide("")
    } else {
      console.log("Dados de alimentação inválidos: feedTime =", feedTime, "breastSide =", breastSide)
    }
  };
  

  const incrementFeedHours = () => {
    setFeedHours(feedHours + 5);
  };

  const decrementFeedHours = () => {
    if (feedHours > 0) {
      setFeedHours(feedHours - 5);
    }
  };

  return (
    <>
      <Header />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={3}
          style={{
            flex: 1,
            padding: "1rem",
            height: "100vh",
            width: "100%",
          }}
        >
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Breast-Feeding
          </Typography>

          <Typography variant="h6">Feeding-Time</Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={decrementFeedHours}
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
              value={feedHours}
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={incrementFeedHours}
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

          <Button
            style={{ display: "flex", width: "250px" }}
            variant="contained"
            color="primary"
            onClick={() => {
              addFeed();
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
          {feed.length > 0 && (
            <List>
              {feed.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Time: ${item.time}, Breast Side: ${item.side}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </>
  );
};
