import {
  Button,
  Container,
  Grid,
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
import { useBabyContext } from "../../Context/BabyContext";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";

export const Baby = () => {
  const { setBabyInfo } = useBabyContext();
  const [babyName, setBabyName] = useState("");
  const [babyAge, setBabyAge] = useState("");
  const [babyWeight, setBabyWeight] = useState(0);
  const [babyBloodType, setBabyBloodType] = useState("");
  const [baby, setBaby] = useState([]);

  const addFeed = () => {
    if (babyName && babyAge && babyWeight) {
      const newBabyEntry = {
        name: babyName,
        age: babyAge,
        weight: babyWeight,
        blood: babyBloodType,
      };
      setBaby([...baby, newBabyEntry]);
      setBabyInfo({ name: babyName, age: babyAge, weight: babyWeight });
      setBabyName("");
      setBabyAge("");
      setBabyBloodType("");
    } else {
      console.log(
        `Dados de alimentação inválidos: babyName = ${babyName}, age = ${babyAge}, weight = ${babyWeight}, blood = ${babyBloodType}`
      );
    }
  };

  const incrementBabyWeight = () => {
    setBabyWeight((prevBabyWeight) => prevBabyWeight + 50);
  };

  const decrementBabyWeight = () => {
    if (babyWeight > 0) {
      setBabyWeight((prevBabyWeight) => prevBabyWeight - 50);
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
            style={{ marginLeft: "3rem", margin: "0.5rem" }}
          >
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Name</Typography>
              <TextField
                style={{ width: "250px", marginTop: "1rem" }}
                label="Name"
                variant="outlined"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
              />
              <Typography variant="h5" style={{ marginTop: "1rem" }}>
                Age
              </Typography>
              <TextField
                style={{ width: "250px", marginTop: "1rem" }}
                label="Age (months)"
                variant="outlined"
                value={babyAge}
                onChange={(e) => setBabyAge(e.target.value)}
              />
              <Typography variant="h5" style={{ marginTop: "1rem" }}>
                Weight (g)
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={decrementBabyWeight}
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
                  value={babyWeight}
                  onChange={(e) => setBabyWeight(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={incrementBabyWeight}
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
                Blood Type
              </Typography>
              <Select
                style={{ width: "250px" }}
                label="Breast Side"
                variant="outlined"
                value={babyBloodType}
                onChange={(e) => setBabyBloodType(e.target.value)}
              >
                <MenuItem value="a+">A+</MenuItem>
                <MenuItem value="a-">A-</MenuItem>
                <MenuItem value="b+">B+</MenuItem>
                <MenuItem value="b-">B-</MenuItem>
                <MenuItem value="ab+">AB+</MenuItem>
                <MenuItem value="ab-">AB-</MenuItem>
                <MenuItem value="o+">O+</MenuItem>
                <MenuItem value="o-">O-</MenuItem>
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
                Add Info
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
                  {baby.map((entry, index) => (
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
