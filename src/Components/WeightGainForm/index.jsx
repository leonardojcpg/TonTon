import { useEffect, useState } from "react";
import { AxiosApi } from "../../Axios/axios.create";
import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useBabyContext } from "../../Context/BabyContext";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

export const WeightGainForm = () => {
  const { setDataInfo } = useBabyContext();
  const [userId, setUserId] = useState(null)
  const [babyList, setBabyList] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState([]);
  const [babyWeight, setBabyWeight] = useState(0);
  const [weightGain, setWeightGain] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchUsers = async() => {
      try{
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
      } catch(error){
        console.error("Erro ao obter usuários:", error.message);
      }
    }
    
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
  }, []);

  const addWeightGain = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        navigate("/login");
        return;
      }

      if (babyWeight && currentDate && selectedBaby) {
        const currentDate = new Date().toISOString().split("T")[0];
        const newWeightGainEntry = {
          weight: babyWeight,
          date: currentDate,
          baby_id: selectedBaby.id,
        };

        const response = await AxiosApi.post(
          "/weight_gain",
          newWeightGainEntry
        );
        const createdWeightGain = await response.json();
        setWeightGain([...weightGain, createdWeightGain]);
        setDataInfo({
          weight: babyWeight,
          date: currentDate,
          baby_id: selectedBaby.id,
        });
        setBabyWeight("");

        if (response.status === 200) {
          console.log("New baby weight added successfully");
          return;
        }
      } else {
        console.log("Erro, invalid data.");
      }
    } catch (error) {
      //console.log("Error creating breast feeding");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  /*     const formatDate = (inputDate) => {
      const date = new Date(inputDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
  
      const formattedDay = day.toString().padStart(2, "0");
      const formattedMonth = month.toString().padStart(2, "0");
    
      return `${formattedDay}/${formattedMonth}/${year}`;
    };
     */

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" style={{ margin: "10px 20px" }}>
        Date:
      </Typography>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
      />
      <Typography variant="h6" style={{ margin: "10px 20px" }}>
        Weight:
      </Typography>
      <TextField
        style={{ width: "250px", margin: "5px 0px" }}
        variant="outlined"
        type="number"
        name="weight"
        value={babyWeight}
        onChange={(e) => setBabyWeight(e.target.value)}
      />
      <Typography variant="h6" style={{ margin: "10px 20px" }}>
        Select Baby:
      </Typography>
      <Select
        style={{ width: "250px", margin: "5px 0px" }}
        variant="outlined"
        type="number"
        value={selectedBaby}
        onChange={(e) => setSelectedBaby(e.target.value)}
      >
        {babyList.filter((item) => item.baby_id == userId).map((baby) => (
          <MenuItem key={baby.id}>
            {baby.name}
          </MenuItem>
        ))}
      </Select>
      <Button
        type="submit"
        variant="contained"
        onClick={addWeightGain}
        style={{
          margin: "20px 10px",
          width: "250px",
          backgroundColor: "#508b50",
          color: "#fff",
        }}
      >
        Add Weight
      </Button>
    </Container>
  );
};
