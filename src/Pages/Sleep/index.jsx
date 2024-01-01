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
import { useState, useEffect } from "react";
import { useBabyContext } from "../../Context/BabyContext";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AxiosApi } from "../../Services/axios.create";
import { useNavigate } from "react-router-dom";

export const Sleep = () => {
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery("(max-width:813px)");

  const { setDataInfo } = useBabyContext();
  const [sleepStartTime, setSleepStartTime] = useState("");
  const [sleepDuration, setSleepDuration] = useState(0);
  const [sleep, setSleep] = useState([]);
  const [userId, setUserId] = useState("")
  const [babyList, setBabyList] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState("");
  const [currentSleepDate, setCurrentSleepDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());


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
        //console.error("Error trying to get user info:", error.message);
      }
    };

    const fetchSleepData = async () => {
      try {
        const response = await AxiosApi.get("/sleep");
        setSleep(response.data);
      } catch (error) {
        console.error("Error fetching sleep data:", error.message);
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
        setBabyList(response.data);
      } catch (error) {
        console.error("Erro ao obter lista de bebês:", error.message);
      }
    };
    fetchUserData()
    fetchBabyList();
    fetchSleepData();
  }, []);

  const addSleep = async () => {

    if (!selectedBaby) {
      toast.warning("Please select your baby")
      return;
    }

    if (!sleepStartTime) {
      toast.warning("Please enter a sleep hour")
      return;
    }

    if (!sleepDuration) {
      toast.warning("Please enter a sleep duration")
      return;
    }

    try {
      if (sleepStartTime && sleepDuration && currentSleepDate) {
        const currentSleepDate = new Date().toISOString().split("T")[0];
        const newSleepEntry = {
          date: currentSleepDate,
          start_time: sleepStartTime,
          duration: sleepDuration,
          baby_id: selectedBaby.id,
        };

        const response = await AxiosApi.post("/sleep", newSleepEntry);
        const createdSleep = await response.data;
        setSleep([...sleep, createdSleep]);
        setDataInfo({
          date: currentSleepDate,
          startTime: sleepStartTime,
          duration: sleepDuration,
          baby_id: selectedBaby.id,
        });

        setCurrentSleepDate("");
        setSleepStartTime("");
        setSleepDuration("");

        navigate("/sleep")
      } else {
/*         console.log(
          `Dados de sono inválidos: date = ${currentSleepDate}, startTime = ${sleepStartTime}, duration = ${sleepDuration}`
        ); */
      }
    } catch (error) {
      //console.error("Error creating sleep record:", error.message);
    }
  };

  const incrementSleepTime = () => {
    setSleepDuration((prevSleepTime) => prevSleepTime + 1);
  };

  const decrementSleepTime = () => {
    if (sleepDuration >= 0) {
      setSleepDuration((prevSleepTime) => prevSleepTime - 1);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day.toString().padStart(2, "0");
    const formattedMonth = month.toString().padStart(2, "0");

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Sleep" />
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
                {babyList.filter((item) => item.user_id == userId).map((baby) => (
                  <MenuItem key={baby.id} value={baby}>
                    {baby.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select your baby</FormHelperText>
              <Typography
                variant="h5"
                style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
              >
                Select Date
              </Typography>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
              />
              <FormHelperText>Select a date here</FormHelperText>
              <Typography variant="h5" style={{ marginTop: "1rem" }}>
                Start-Time
              </Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                variant="outlined"
                value={sleepStartTime}
                onChange={(e) => setSleepStartTime(e.target.value)}
              />
              <FormHelperText>24h format</FormHelperText>
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
                  style={{ width: "6.25rem", margin: "0 0.625rem", textAlignLast: "center" }}
                  variant="outlined"
                  type="number"
                  value={sleepDuration}
                  onChange={(e) => setSleepDuration(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">hours</InputAdornment>
                  }}
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
                onClick={addSleep}
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
                Add Sleep
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Sleep Info:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {sleep
                    .filter((entry) => entry.baby_id === selectedBaby.id)
                    .map((entry, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          border: "1px solid #ccc",
                          width: isSmallScreen ? "355px" : "500px",
                          borderRadius: "8px",
                          marginBottom: "0.5rem",
                          margin: "5px 0",
                          backgroundColor: "#c5e2c1",
                        }}
                      >
                        <ListItemText
                          primary={`Date: ${formatDate(entry.date)}`}
                          secondary={
                            <>
                            <strong>Hora: </strong>{entry.start_time + " h"}
                            <br />
                            <strong>Duration: </strong>{entry.duration + " h"}
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                </List>
              </div>
              <Typography variant="h5">Last Sleep Info Baby:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {sleep.slice(-1).map((sleeping, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        border: "1px solid #ccc",
                        width: isSmallScreen ? "355px" : "500px",
                        borderRadius: "8px",
                        marginBottom: "0.5rem",
                        margin: "5px 0",
                        backgroundColor: "#e9e9e9",
                      }}
                    >
                      <ListItemText
                        primary={`Date: ${formatDate(sleeping.date)}`}
                        secondary={
                          <>
                            <strong>Hora: </strong>{sleeping.start_time + " h"}
                            <br />
                            <strong>Duration: </strong>{sleeping.duration + " h"}
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
