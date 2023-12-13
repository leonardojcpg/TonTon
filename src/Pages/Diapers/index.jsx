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
import { useEffect, useState } from "react";
import { useBabyContext } from "../../Context/BabyContext";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";
import { useNavigate } from "react-router-dom";
import { AxiosApi } from "../../Axios/axios.create";
import { toast } from "react-toastify";
import { Axios } from "axios";

export const Diapers = () => {
  const { setDataInfo } = useBabyContext();
  const navigate = useNavigate();
  const [diapersLabel, setDiapersLabel] = useState("");
  const [diapersSize, setDiapersSize] = useState("");
  const [diapersQuantity, setDiapersQuantity] = useState(0);
  const [diapers, setDiapers] = useState([]);

  const [babyList, setBabyList] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBabyList = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          toast.error("User has to authenticate");
          return;
        }
        const response = await AxiosApi.get("/baby", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setBabyList(response.data);
      } catch (error) {
        //console.error("Erro ao obter lista de bebês:", error.message);
      }
    };

    const fetchDiapers = async() => {
      try{
        const authToken = localStorage.getItem("authToken")
        if(!authToken){
          toast.error("User has to authenticate")
          return
        }
        const response = await AxiosApi.get("/diapers", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        setDiapers(response.data)
      } catch(error){
        console.log("Error trying to list diapers")
      }
    }

    fetchDiapers();
    fetchBabyList();
  }, []);

  const addDiapers = async () => {
    if (diapersLabel && diapersSize && diapersQuantity) {
      const newDiapersEntry = {
        label: diapersLabel,
        size: diapersSize,
        quantity: diapersQuantity,
        baby_id: selectedBaby.id,
      };
      const response = await AxiosApi.post("/diapers", newDiapersEntry);

      if (response.status === 200) {
        const createdDiapersInfo = await response.data;
        setDiapers([...diapers, createdDiapersInfo]);
        setDataInfo({
          label: diapersLabel,
          size: diapersSize,
          quantity: diapersQuantity,
          baby_id: selectedBaby.id,
        });
        setDiapersLabel("");
        setDiapersSize("");
        setDiapersQuantity("");
      } else {
        console.error
        ("Error creating diaper record:");
      }
    }
  };

  const incrementDiapersQuantity = () => {
    setDiapersQuantity((prevDiapersQuantity) => prevDiapersQuantity + 10);
  };

  const decrementDiapersQuantity = () => {
    if (diapersQuantity > 0) {
      setDiapersQuantity((prevDiapersQuantity) => prevDiapersQuantity - 10);
    }
  };

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Diapers" />
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
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Select Baby
              </Typography>
              <Select
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Select Baby"
                variant="outlined"
                value={selectedBaby}
                onChange={(e) => setSelectedBaby(e.target.value)}
              >
                {babyList.map((baby) => (
                  <MenuItem key={baby.id} value={baby}>
                    {baby.name}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>Label</Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                variant="outlined"
                value={diapersLabel}
                onChange={(e) => setDiapersLabel(e.target.value)}
              />
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Size
              </Typography>
              <Select
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Size"
                variant="outlined"
                value={diapersSize}
                onChange={(e) => setDiapersSize(e.target.value)}
              >
                <MenuItem value="n">RN</MenuItem>
                <MenuItem value="p">P</MenuItem>
                <MenuItem value="m">M</MenuItem>
                <MenuItem value="l">L</MenuItem>
                <MenuItem value="xl">XL</MenuItem>
                <MenuItem value="xxl">XXL</MenuItem>
              </Select>
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Quantity
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
                  onClick={decrementDiapersQuantity}
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
                  value={diapersQuantity}
                  onChange={(e) => setDiapersQuantity(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={incrementDiapersQuantity}
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
                style={{ display: "flex", width: "250px", marginTop: "1rem" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  addDiapers();
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
                Add Diapers
              </Button>
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Diapers Info:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {diapers
                    .filter((entry) => entry.baby_id === selectedBaby.id)
                    .map((entry, index) => (
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
                          primary={`Label: ${entry.label}`}
                          secondary={
                            <>
                              Size: {entry.size.toUpperCase()}
                              <br />
                              Quantity: {entry.quantity}
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
