import {
  Button,
  Container,
  FormHelperText,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useBabyContext } from "../../Context/BabyContext";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";
import { useNavigate } from "react-router-dom";
import { AxiosApi } from "../../Services/axios.create";
import { toast } from "react-toastify";

export const Diapers = () => {
  const isSmallScreen = useMediaQuery("(max-width:813px)");

  const { setDataInfo } = useBabyContext();
  const navigate = useNavigate();
  const [diapersLabel, setDiapersLabel] = useState("");
  const [diapersSize, setDiapersSize] = useState("");
  const [diapersQuantity, setDiapersQuantity] = useState(0);
  const [diapers, setDiapers] = useState([]);
  const [babyList, setBabyList] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState("");
  const [userId, setUserId] = useState("");


  const decodeJwtToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Erro ao decodificar token JWT:", error.message);
      return null;
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate.");
          return;
        }
        const decodedToken = decodeJwtToken(authToken);
        if (decodedToken) {
          const userId = decodedToken.sub;
          setUserId(userId);
          const response = await AxiosApi.get(`/user/${userId}`);
          const userData = response.data;

          console.log("Informações do usuário:", userData);
        } else {
          console.error("Invalid JWT Token.");
        }
      } catch (error) {
        //console.error("Error trying to get user info", error);
      }
    };

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
        const babiesByUser = response.data;

        setBabyList(babiesByUser);
        ("");
      } catch (error) {
        //console.error("Erro ao obter lista de bebês:", error.message);
      }
    };

    const fetchDiapers = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          toast.error("User has to authenticate");
          return;
        }
        const response = await AxiosApi.get("/diapers", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setDiapers(response.data);
      } catch (error) {
        console.log("Error trying to list diapers");
      }
    };
    fetchUserData();
    fetchDiapers();
    fetchBabyList();
  }, []);

  const addDiapers = async () => {

    if (!diapersLabel) {
      toast.warning("Please enter a valid brand name")
      return;
    }

    if (!diapersSize) {
      toast.warning("Please enter a diaper size")
      return;
    }

    if (diapersQuantity <= 0) {
      toast.warning("Please enter a value higher then zero")
      return;
    }

    const newDiapersEntry = {
      label: diapersLabel,
      size: diapersSize,
      quantity: parseInt(diapersQuantity, 10),
      baby_id: parseInt(selectedBaby.id, 10),
    };

    try {
      const response = await AxiosApi.post("/diapers", newDiapersEntry);

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

        navigate("/diapers")

    } catch (error) {
      console.error("Erro ao adicionar fraldas:", error);
      console.log("Erro detalhado:", error);    
    }
  };

  const incrementDiapersQuantity = () => {
    setDiapersQuantity((prevDiapersQuantity) => prevDiapersQuantity + 1);
  };

  const decrementDiapersQuantity = () => {
    if (diapersQuantity <= 0) {
      return null;
    }
    setDiapersQuantity((prevDiapersQuantity) => prevDiapersQuantity - 1);
  };

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Diapers" />
      <Paper
        elevation={0}
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
            style={{
              margin: isSmallScreen ? "" : "0 auto",
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: isSmallScreen ? "center" : "",
            }}
          >
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
                {babyList
                  .filter((item) => item.user_id == userId)
                  .map((baby) => (
                    <MenuItem key={baby.id} value={baby}>
                      {baby.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Select your baby</FormHelperText>
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Brand
              </Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                variant="outlined"
                value={diapersLabel}
                onChange={(e) => setDiapersLabel(e.target.value)}
                />
              <FormHelperText>Select your diaper brand</FormHelperText>
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
                <MenuItem value="s">P</MenuItem>
                <MenuItem value="m">M</MenuItem>
                <MenuItem value="l">L</MenuItem>
                <MenuItem value="xl">XL</MenuItem>
                <MenuItem value="xxl">XXL</MenuItem>                
              </Select>
              <FormHelperText>Select your diaper size</FormHelperText>
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Diapers Quantity
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
                  style={{ width: "6.25rem", margin: "0 0.625rem", textAlignLast: "center"}}
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
                onClick={addDiapers}
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
                          width: "500px",
                          borderRadius: "7px",
                          marginBottom: "0.5rem",
                          margin: "5px 0",
                          backgroundColor: "#c5e2c1",
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
              <Typography variant="h5">Last Diaper Info:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {diapers.slice(-1).map((diaper, index) => (
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
                        primary={`Brand: ${diaper.label}`}
                        secondary={
                          <>
                            Size: {diaper.size.toUpperCase()}
                            <br />
                            Quantity: {diaper.quantity}
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
