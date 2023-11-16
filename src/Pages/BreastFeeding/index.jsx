import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  TextField,
  Grid,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";

import { PageTitle } from "../../Components/PageTitle";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { useBabyContext } from "../../Context/BabyContext/";

export const BreastFeeding = () => {
  const { setBabyInfo } = useBabyContext();

  const [feedTime, setFeedTime] = useState(0);
  const [breastSide, setBreastSide] = useState("");
  const [feed, setFeed] = useState([]);
  const [feedHour, setFeedHour] = useState("");

  const addFeed = () => {
    if (feedTime && breastSide && feedHour) {
      const newFeedEntry = { time: feedTime, side: breastSide, hour: feedHour };
      setFeed([...feed, newFeedEntry]);
      setBabyInfo({ time: feedTime, side: breastSide, hour: feedHour });
      setFeedTime("");
      setBreastSide("");
      setFeedHour("");
    } else {
      console.log(
        `Dados de alimentação inválidos: feedTime = ${feedTime}, breastSide = ${breastSide}, hour = ${feedHour}`
      );
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
      <ResponsiveHeader />
      <PageTitle pageTitle="Breast-Feeding" />
      <Paper
        elevation={3}
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Grid
            container
            spacing={3}
            style={{ margin: "1rem", marginLeft: "3rem" }}
          >
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Feeding-Duration</Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
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
              <Typography variant="h5" style={{ marginTop: "1rem" }}>
                Breast-Side
              </Typography>
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
              <Typography variant="h5" style={{ marginTop: "1rem" }}>
                Feeding Hour
              </Typography>
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
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Feeding Details:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
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
                        primary={`Duration: ${entry.time} minutes`}
                        secondary={
                          <>
                            Breast-Side: {entry.side}
                            <br />
                            Time: {entry.hour + " h"}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};
