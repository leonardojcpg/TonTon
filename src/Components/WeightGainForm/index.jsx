import { useEffect, useState } from "react";
import { AxiosApi } from "../../Services/axios.create";
import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useBabyContext } from "../../Context/BabyContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const WeightGainForm = ({ onAddWeight  }) => {
  const isSmallScreen = useMediaQuery("(max-width:813px)");
  
  const navigate = useNavigate()
  const { setDataInfo } = useBabyContext();
  const [userId, setUserId] = useState(null);
  const [babies, setBabies] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState("");
  const [babyWeight, setBabyWeight] = useState(0);
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
      console.error("Erro ao decodificar token JWT:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
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
        const response = await AxiosApi.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const userData = response.data;
        if (userData && Array.isArray(userData.babies)) {
          setBabies(userData.babies);
        } else {
          console.error("Invalid user data format:");
        }
      } catch (error) {
        //console.error("Error trying to fetch user data:", error);
      }
    };

    const fetchBabies = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate");
          return;
        }
        const response = await AxiosApi.get("/baby");
        const responseData = response.data;

        if (Array.isArray(responseData)) {
          setBabies(responseData);
        } else {
          console.error("Invalid response format:", responseData);
        }
      } catch (error) {
        console.log("Error trying to list babies.", error);
      }
    };

    fetchUserData();
    fetchBabies();
  }, []);

  const addWeightGain = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }

    if(!babyWeight){
      toast.warning("Please, set a weight value before!")
    }
    
    if(!selectedBaby){
      toast.warning("Please, select your baby!")
    }

    try {
        const currentDate = selectedDate.toISOString().split("T")[0];
        const newWeightGainEntry = {
          weight: babyWeight,
          date: currentDate,
          baby_id: selectedBaby,
        };
  
        const response = await AxiosApi.post("/weight_gain", newWeightGainEntry);
        const createdWeightGain = response.data;
        onAddWeight(createdWeightGain);

        setDataInfo({
          weight: babyWeight,
          date: currentDate,
          baby_id: selectedBaby,
        });
        setBabyWeight("");

        navigate("/");

    } catch (error) {
      console.error("Erro ao criar ganho de peso:", error);
    }
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "center",
        padding: isSmallScreen ? "10px" : "10px",
      }}
    >
      <Typography
        variant="h6"
        style={{
          margin: ".625rem 1.25rem",
          marginTop: isSmallScreen ? "2rem" : "0",
        }}
      >
        Date:
      </Typography>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
      />
      <Typography
        variant="h6"
        style={{ margin: "5px 20px", whiteSpace: "nowrap" }}
      >
        Weight:
      </Typography>
      <TextField
        style={{ width: "15.625rem", margin: ".3125rem 0rem" }}
        variant="outlined"
        type="number"
        name="weight"
        value={babyWeight}
        onChange={(e) => setBabyWeight(e.target.value)}
      />
      <Typography
        variant="h6"
        style={{ margin: ".3125rem 1.25rem", whiteSpace: "nowrap" }}
      >
        Select Baby:
      </Typography>
      <Select
        style={{ width: "15.625rem", margin: ".3125rem 0rem" }}
        variant="outlined"
        value={selectedBaby}
        onChange={(e) => {
          setSelectedBaby(e.target.value);
        }}
      >
        {babies.length > 0 ? (
          babies.filter((item) => item.user_id == userId).map((baby) => (
            <MenuItem key={baby.id} value={baby.id}>
              {baby.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No babies found</MenuItem>
        )}
      </Select>
      <Button
        type="submit"
        variant="contained"
        onClick={addWeightGain}
        style={{
          margin: "1.25rem .625rem",
          width: "15.625rem",
          backgroundColor: "#508b50",
          color: "#fff",
        }}
      >
        Add Weight
      </Button>
    </Container>
  );
};
