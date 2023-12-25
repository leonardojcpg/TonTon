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
import { AxiosApi } from "../../Axios/axios.create.js";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

export const Diary = () => {
  const navigate = useNavigate();
  const { setDataInfo } = useBabyContext();

  const [note, setNote] = useState("");
  const [diary, setDiary] = useState([]);
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
        //console.error("Erro ao obter lista de bebês:", error.message);
      }
    };

    const fetchDiary = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          toast.error("User has to authenticate");
          return;
        }
        const response = await AxiosApi.get("/diary", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setDiary(response.data);
      } catch (error) {
        console.log("Error trying to list diapers");
      }
    };

    fetchDiary();
    fetchBabyList();
  }, []);

  const addDiary = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        navigate("/login");
        return;
      }

      if (note && selectedBaby) {
        const currentDate = new Date().toISOString().split("T")[0];
        const newDiaryEntry = {
          date: currentDate,
          note: note,
          baby_id: selectedBaby.id,
        };

        const response = await AxiosApi.post("/diary", newDiaryEntry);

        const createdDiaryInfo = await response.json();
        setFeed([...diary, createdDiaryInfo]);
        setDataInfo({ date: currentDate, note: note });
        setNote("");

        if (response.status === 200 || 201) {
          toast.success("Feed added successfully");
          return;
        }
      } else {
        console.log("Erro, invalid data.");
      }
    } catch (error) {
      //console.log("Error creating diary");
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
      <PageTitle pageTitle="Diary" />
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
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Note
              </Typography>
              <TextField
                multiline
                rows={5}
                style={{ width: "100%", marginTop: ".5rem" }}
                label="Put your note here!"
                variant="outlined"
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                style={{ display: "flex", width: "250px", marginTop: ".5rem" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  addDiary();
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
                Add Note
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Note:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {diary
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
                          primary={`Date: ${formatDate(entry.date)}`}
                          secondary={`Note: ${entry.note}`}
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
