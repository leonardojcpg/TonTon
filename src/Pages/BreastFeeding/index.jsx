import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import InfoList from "../../Components/InfoList";
import { Header } from "../../Components/Header";

export const BreastFeeding = () => {
  const [feedTime, setFeedTime] = useState("");
  const [breastSide, setBreastSide] = useState("");
  const [feed, setFeed] = useState([]);
  const [activeInfoType, setActiveInfoType] = useState(null);
  const [feedHours, setFeedHours] = useState(0)


  const addFeed = () => {
    if (feedTime && breastSide) {
      const newFeedEntry = { time: feedTime, side: breastSide };
      setFeed([...feed, newFeedEntry]);
      setFeedTime("");
      setBreastSide("");

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
          transform: "translate(0%, 19%)",
        }}
      >
        <Paper
          elevation={3}
          style={{
            flex: 1,
            padding: "1rem",
            height: "100vh",
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
              style={{ width: "100px", margin: "0 0.625rem" }}
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
              setActiveInfoType("feed");
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

          {activeInfoType === "feed" && <InfoList data={feed} />}
        </Paper>
      </Container>
    </>
  );
};
