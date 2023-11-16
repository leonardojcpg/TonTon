import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useBabyContext } from "../../Context/BabyContext";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";

export const Sleep = () => {
  const { setBabyInfo } = useBabyContext();
  const [sleepDate, setSleepDate] = useState("");
  const [sleepStartTime, setSleepStartTime] = useState("");
  const [sleepDuration, setSleepDuration] = useState(0);
  const [baby, setBaby] = useState([]);

  const addSleep = () => {
    if (sleepDate && sleepStartTime && sleepDuration) {
      const newBabyEntry = {
        date: sleepDate,
        startTime: sleepStartTime,
        duration: sleepDuration,
      };
      setBaby([...baby, newBabyEntry]);
      setBabyInfo({
        date: sleepDate,
        startTime: sleepStartTime,
        duration: sleepDuration,
      });
      setSleepDate("");
      setSleepStartTime("");
      setSleepDuration("");
    } else {
      console.log(
        `Dados de alimentação inválidos: date = ${sleepDate}, startTime = ${sleepStartTime}, duration = ${sleepDuration}`
      );
    }
  };

  const incrementSleepTime = () => {
    setSleepDuration((prevSleepTime) => prevSleepTime + 1);
  };

  const decrementSleepTime = () => {
    if (sleepDuration > 0) {
      setSleepDuration((prevSleepTime) => prevSleepTime - 1);
    }
  };

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Sleep" />
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
            style={{ marginLeft: "3rem", margin: "0.5rem" }}
          >
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Date</Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Date"
                variant="outlined"
                value={sleepDate}
                onChange={(e) => setSleepDate(e.target.value)}
              />
              <Typography variant="h5" style={{ marginTop: "1rem" }}>
                Start-Time
              </Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Age (months)"
                variant="outlined"
                value={sleepStartTime}
                onChange={(e) => setSleepStartTime(e.target.value)}
              />
              <Typography variant="h5" style={{ marginTop: "1rem" }}>
                Sleep Duration
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: ".5rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={decrementSleepTime}
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
                  value={sleepDuration}
                  onChange={(e) => setSleepDuration(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={incrementSleepTime}
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
              <Button
                style={{ display: "flex", width: "250px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  addSleep();
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
                Add Baby Info
              </Button>
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Sleep Details:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {baby.map((entry, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        marginBottom: "0.5rem",
                        padding: "0.5rem",
                        backgroundColor: "#e9e9e9",
                      }}
                    >
                      <ListItemText
                        primary={`Date: ${entry.date}`}
                        secondary={
                          <>
                            Start-Time: {entry.startTime} h
                            <br />
                            Duration: {entry.duration} h
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
