import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Header } from "../../Components/Header";
import { format, differenceInHours } from "date-fns";
import InfoList from "../../Components/InfoList";

export const Dashboard = () => {
  // feeding
  const [feedTime, setFeedTime] = useState("");
  const [breastSide, setBreastSide] = useState("");
  const [feed, setFeed] = useState([]);
  // diapers
  const [diapersTime, setDiapersTime] = useState("");
  const [diapersType, setDiapersType] = useState("");
  const [diapers, setDiapers] = useState([]);
  // sleep
  const [sleepTimeStart, setSleepTimeStart] = useState("");
  const [sleepTimeEnd, setSleepTimeEnd] = useState("");
  const [sleep, setSleep] = useState([]);
  // list information
  const [activeInfoType, setActiveInfoType] = useState(null);

  const addFeed = () => {
    if (feedTime && breastSide) {
      setFeed([...feed, { time: feedTime, side: breastSide }]);
      setFeedTime("");
      setBreastSide("");
    }
  };

  const addDiapers = () => {
    if (diapersTime && diapersType) {
      setDiapers([...diapers, { time: diapersTime, type: diapersType }]);
      setDiapersTime("");
      setDiapersType("");
    }
  };

  const addSleep = () => {
    if (sleepTimeStart && sleepTimeEnd) {
      const startTimeParts = sleepTimeStart.split(":");
      const endTimeParts = sleepTimeEnd.split(":");

      if (startTimeParts.length === 2 && endTimeParts.length === 2) {
        const startHour = parseInt(startTimeParts[0], 10);
        const startMinute = parseInt(startTimeParts[1], 10);
        const endHour = parseInt(endTimeParts[0], 10);
        const endMinute = parseInt(endTimeParts[1], 10);

        if (
          !isNaN(startHour) &&
          !isNaN(startMinute) &&
          !isNaN(endHour) &&
          !isNaN(endMinute)
        ) {
          const startTime = new Date(0, 0, 0, startHour, startMinute);
          const endTime = new Date(0, 0, 0, endHour, endMinute);
          const duration = differenceInHours(endTime, startTime);

          setSleep([
            ...sleep,
            {
              startTime: format(startTime, "HH:mm"),
              endTime: format(endTime, "HH:mm"),
              duration: `${duration}`,
            },
          ]);
          setSleepTimeStart("");
          setSleepTimeEnd("");
        }
      }
    }
  };

  return (
  <>
    <Header />
    <Container style={{display: "flex", flexDirection: "column" }}>
      <Paper elevation={3} style={{ flex: 1, padding: "1rem", position: "relative", transform: "translate(0,17%)", height: "100vh"}}>
        <Typography variant="h4">Dashboard</Typography>
        <div>
          <Typography variant="h6">Breast-Feeding</Typography>
          <TextField
            label="Time (hours)"
            variant="outlined"
            value={feedTime}
            onChange={(e) => setFeedTime(e.target.value)}
          />
          <TextField
            label="Breast Side"
            variant="outlined"
            value={breastSide}
            onChange={(e) => setBreastSide(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addFeed();
              setActiveInfoType("feed");
            }}
            sx={{
              marginTop: 1,
              marginLeft: 2,
              backgroundColor: "#508b50",
              "&:hover": {
                backgroundColor: "#a4dfa4",
                borderColor: "#a4dfa4",
                color: "#508b50",
              },
            }}
          >
            Add
          </Button>
          {activeInfoType === "feed" && <InfoList data={feed} />}
        </div>
        <div>
          <Typography variant="h6">Sleep Monitoring</Typography>
          <TextField
            label="Start of Sleep"
            variant="outlined"
            value={sleepTimeStart}
            onChange={(e) => setSleepTimeStart(e.target.value)}
          />
          <TextField
            label="End of Sleep"
            variant="outlined"
            value={sleepTimeEnd}
            onChange={(e) => setSleepTimeEnd(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addSleep}
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
            {sleep.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.time} - ${item.duration} horas`}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div>
          <Typography variant="h6">Diapers Control</Typography>
          <TextField
            label="Size"
            variant="outlined"
            value={diapersTime}
            onChange={(e) => setDiapersTime(e.target.value)}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            value={diapersType}
            onChange={(e) => setDiapersType(e.target.value)}
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
                <ListItemText primary={`${item.horario} - ${item.tipo}`} />
              </ListItem>
            ))}
          </List>
        </div>
      </Paper>
    </Container>
  </>
  );
};
