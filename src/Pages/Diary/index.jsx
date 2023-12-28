import {
  Button,
  Container,
  FormHelperText,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  selectClasses,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useBabyContext } from "../../Context/BabyContext";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";
import { useNavigate } from "react-router-dom";
import { AxiosApi } from "../../Services/axios.create.js";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

export const Diary = () => {
  const isSmallScreen = useMediaQuery("(max-width:813px)");

  const navigate = useNavigate();
  const { setDataInfo } = useBabyContext();

  const [note, setNote] = useState("");
  const [diary, setDiary] = useState([]);
  const [babyList, setBabyList] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const [selectedBaby, setSelectedBaby] = useState("");
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

    const fetchAvailableUsers = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate");
          return;
        }
        const decodedToken = decodeJwtToken(authToken);
        if (decodedToken) {
          const userId = decodedToken.sub;
          setUserId(userId);
        }
        await AxiosApi.get("/users", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } catch (error) {
        //console.error("Error trying to get users:", error.message);
      }
    };

    fetchAvailableUsers()
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
        const createdDiaryInfo = await response.data;
        setDiary([...diary, createdDiaryInfo]);
        setDataInfo({ date: currentDate, note: note });
        setNote("");

        navigate("/diary")


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
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Note
              </Typography>
              <TextField
                multiline
                rows={5}
                style={{ width: "100%", marginTop: ".5rem" }}
                placeholder="Type your note here!"
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
                    .filter((entry) => entry.baby_id == selectedBaby.id)
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
                          secondary={
                            <>
                            <strong>Note: </strong>{entry.note}
                            </>
                          }
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
              <Typography variant="h5">Last Diaper Info:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {diary.slice(-1).map((diaryInfo, index) => (
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
                        primary={`Date: ${formatDate(diaryInfo.date)}`}
                        secondary={
                          <>
                          <strong>Note: </strong>{diaryInfo.note}
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
