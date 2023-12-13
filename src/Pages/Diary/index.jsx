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

export const Diary = () => {
  const { setDataInfo } = useBabyContext();
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [observation, setObservation] = useState(0);
  const [baby, setBaby] = useState([]);

  const addFeed = () => {
    if (date && hour && observation) {
      const newBabyEntry = {
        date: date,
        hour: hour,
        observation: observation,
      };
      setBaby([...baby, newBabyEntry]);
      setDataInfo({
        date: date,
        hour: hour,
        observation: observation,
      });
      setDate("");
      setHour("");
      setObservation("");
    } else {
      console.log(
        `Dados de alimentação inválidos: date = ${date}, age = ${hour}, observation = ${observation}`
      );
    }
  };

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Baby" />
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
            style={{ margin: "0 auto" }}
          >
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Date</Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Date"
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Hour
              </Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Hour"
                variant="outlined"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              />
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Observation
              </Typography>
              <TextField
                multiline
                rows={10}
                style={{ width: "100%", marginTop: ".5rem" }}
                label="Put your observation here!"
                variant="outlined"
                onChange={(e) => setObservation(e.target.value)}
              />
              <Button
                style={{ display: "flex", width: "250px", marginTop: ".5rem" }}
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
                Add Observation
              </Button>
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Observation:</Typography>
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
                        secondary={`Observation: ${entry.observation}`}
                        primaryTypographyProps={{ variant: "subtitle1" }}
                        secondaryTypographyProps={{
                          component: "div",
                          variant: "body2",
                        }}
                        sx={{
                          overflow: "auto",
                          textOverflow: "ellipsis",
                          whiteSpace: "normal",
                        }}
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
