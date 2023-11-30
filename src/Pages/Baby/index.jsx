import { useEffect, useState } from "react";
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
import { useBabyContext } from "../../Context/BabyContext";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";
import { AxiosApi } from "../../Axios/axios.create";

export const Baby = () => {
  const { setDataInfo } = useBabyContext();
  const [babyName, setBabyName] = useState("");
  const [babyAge, setBabyAge] = useState("");
  const [babyWeight, setBabyWeight] = useState(0);
  const [babyBloodType, setBabyBloodType] = useState("");
  const [selectedParent, setSelectedParent] = useState("");
  const [babyList, setBabyList] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);


  useEffect(() => {
    const fetchAvailableUsers = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("Usuário não autenticado.");
          return;
        }
        const response = await AxiosApi.get("/users", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
          setAvailableUsers(response.data);
      } catch (error) {
        console.error("Erro ao obter usuários:", error.message);
      }
    };

    fetchAvailableUsers();
  }, []);

  const addBaby = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("Usuário não autenticado.");
        return;
      }

      if (
        babyName &&
        babyAge &&
        babyWeight &&
        babyBloodType &&
        selectedParent &&
        availableUsers.length > 0
      ) {
        const newBabyEntry = {
          name: babyName,
          age: babyAge,
          weight: babyWeight,
          blood_type: babyBloodType,
        };

        const babyResponse = await AxiosApi.post("/baby", newBabyEntry);
        const newBaby = babyResponse.data;

        await AxiosApi.post(`/user_baby/${selectedParent}/baby/${newBaby.id}/associate`);
        setBabyList([...babyList, newBaby]);

        setDataInfo({
          name: babyName,
          age: babyAge,
          weight: babyWeight,
          blood_type: babyBloodType,
        });

        setBabyName("");
        setBabyAge("");
        setBabyWeight("");
        setBabyBloodType("");
        setSelectedParent("");
      } else {
        console.log("Dados de alimentação inválidos ou nenhum usuário disponível.");
      }
    } catch (error) {
      console.error("Erro ao adicionar informações do bebê:", error.message);
    }
  };

  const incrementBabyWeight = () => {
    setBabyWeight((prevBabyWeight) => prevBabyWeight + 1);
  };

  const decrementBabyWeight = () => {
    if (babyWeight > 0) {
      setBabyWeight((prevBabyWeight) => prevBabyWeight - 1);
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
            style={{ marginLeft: "3rem", margin: "0 auto" }}
          >
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Name</Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Name"
                variant="outlined"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
              />
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Age
              </Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Age (months)"
                variant="outlined"
                value={babyAge}
                onChange={(e) => setBabyAge(e.target.value)}
              />
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Weight
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
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
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
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Select Baby Parent
              </Typography>
              <Select
                style={{ width: "250px" }}
                label="Select Parent"
                variant="outlined"
                value={selectedParent}
                onChange={(e) => setSelectedParent(e.target.value)}
              >
                {availableUsers.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>


              <Button
                style={{ display: "flex", width: "250px", marginTop: ".5rem" }}
                variant="contained"
                color="primary"
                onClick={addBaby}
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
                Add Baby
              </Button>
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Baby Info:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {babyList.map((entry, index) => (
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
                        primary={`Name: ${entry.name}`}
                        secondary={
                          <>
                            Age: {entry.age} months
                            <br />
                            Weight: {entry.weight + " g"}
                            <br />
                            Blood-type: {entry.blood}
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
