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
import { useState, useEffect } from "react";
import { useBabyContext } from "../../Context/BabyContext";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";
import { toast } from "react-toastify";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AxiosApi } from "../../Axios/axios.create";

export const Sleep = () => {
  const { setDataInfo } = useBabyContext();
  const [sleepStartTime, setSleepStartTime] = useState("");
  const [sleepDuration, setSleepDuration] = useState(0);
  const [sleep, setSleep] = useState([]);
  const [babyList, setBabyList] = useState([])
  const [selectedBaby, setSelectedBaby] = useState("");
  const [currentSleepDate, setCurrentSleepDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  

  useEffect(() => {
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

    fetchBabyList();
    fetchSleepData();
  }, []);

  const addSleep = async () => {
    try {
      if (sleepStartTime && sleepDuration && currentSleepDate) {
        const currentSleepDate = new Date().toISOString().split('T')[0];
        const newSleepEntry = {
          date: currentSleepDate,
          start_time: sleepStartTime,
          duration: sleepDuration,
          baby_id: selectedBaby.id,
        };

        const response = await AxiosApi.post("/sleep", newSleepEntry);
        const createdSleep = await response.json();
        setSleep([...sleep, createdSleep])
        setDataInfo({
          date: currentSleepDate,
          startTime: sleepStartTime,
          duration: sleepDuration,
          baby_id: selectedBaby.id,
        });

        setCurrentSleepDate("");
        setSleepStartTime("");
        setSleepDuration("");

      } else {
        console.log(
          `Dados de sono inválidos: date = ${currentSleepDate}, startTime = ${sleepStartTime}, duration = ${sleepDuration}`
        );
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

              <Typography variant="h5" style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
                Select Date
              </Typography>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
              />
              <Typography variant="h5" style={{ marginTop: "1rem" }}>
                Start-Time
              </Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Start-Time"
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
            {/* Right Column */}
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
                        width: "500px",
                        borderRadius: "7px",
                        marginBottom: "0.5rem",
                        margin: "5px 0",
                        backgroundColor: "#c5e2c1",
                      }}
                    >
                      <ListItemText
                        primary={`Date: ${formatDate(entry.date)}`  }
                        secondary={
                          <>
                            Start-Time: {entry.start_time}
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
