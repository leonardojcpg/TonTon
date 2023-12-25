import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { AxiosApi } from "../../Axios/axios.create";
import { toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const BreastFeeding = () => {
  const { setDataInfo } = useBabyContext();
  const navigate = useNavigate();

  const [feedTime, setFeedTime] = useState(0);
  const [breastSide, setBreastSide] = useState("");
  const [feed, setFeed] = useState([]);
  const [feedHour, setFeedHour] = useState("");
  const [babyList, setBabyList] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

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
        console.error("Erro ao obter lista de bebês:", error.message);
      }
    };

    const fetchFeedList = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          toast.error("Usuário não autenticado.");
          return;
        }
        const response = await AxiosApi.get("/breast_feeding");
        const responseData = response.data;

        if (Array.isArray(responseData)) {
          setFeed(responseData);
        } else {
          console.error("Invalid response format:", responseData);
        }
      } catch (error) {
        console.log("Error trying to list feed.", error.message);
      }
    };

    fetchFeedList();
    fetchBabyList();
  }, []);

  const addFeed = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        navigate("/login");
        return;
      }

      if (feedTime && breastSide && feedHour && selectedBaby) {
        const currentDate = new Date().toISOString().split("T")[0];
        const newFeedEntry = {
          duration: feedTime,
          side: breastSide,
          hour: feedHour,
          date: currentDate,
          baby_id: selectedBaby.id,
        };

        const response = await AxiosApi.post("/breast_feeding", newFeedEntry);

        const createdBreastFeeding = await response.json();
        setFeed([...feed, createdBreastFeeding]);
        setDataInfo({
          duration: feedTime,
          side: breastSide,
          hour: feedHour,
          date: currentDate,
        });
        setFeedTime("");
        setBreastSide("");
        setFeedHour("");

        if (response.status === 200) {
          toast.success("Feed added successfully");
          return;
        }
      } else {
        console.log("Erro, invalid data.");
      }
    } catch (error) {
      //console.log("Error creating breast feeding");
    }
  };

  const incrementFeedTime = () => {
    setFeedTime((prevFeedTime) => prevFeedTime + 5);
  };

  const decrementFeedTime = () => {
    if (feedTime >= 0) {
      setFeedTime((prevFeedTime) => prevFeedTime - 5);
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
          <Grid container spacing={3} style={{ margin: "0 auto" }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Feeding-Duration</Typography>
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
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Breast-Side
              </Typography>
              <Select
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Breast Side"
                variant="outlined"
                value={breastSide}
                onChange={(e) => setBreastSide(e.target.value)}
              >
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="right">Right</MenuItem>
              </Select>
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Feeding Hour
              </Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                label="Hour"
                variant="outlined"
                value={feedHour}
                onChange={(e) => setFeedHour(e.target.value)}
              />
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
              <Button
                style={{ display: "flex", width: "250px", marginTop: ".5rem" }}
                variant="contained"
                color="primary"
                onClick={addFeed}
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
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Feeding Info:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {feed
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
                          primary={`Duration: ${entry.duration} minutes`}
                          secondary={
                            <>
                              Breast-Side:{" "}
                              {entry.side.charAt(0).toUpperCase() +
                                entry.side.slice(1).toLowerCase()}
                              <br />
                              Dia: {entry.hour + " h"}
                              <br />
                              Date: {formatDate(entry.date)}
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
