import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";
import { DashboardCards } from "../../Components/DashboardCards";
import { DashboardChart } from "../../Components/DashboardChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosApi } from "../../Services/axios.create";
import { format } from "date-fns";
import { WeightGainForm } from "../../Components/WeightGainForm";
import { FormHelperText } from "@mui/material";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [babyId, setBabyId] = useState("");
  const [babies, setBabies] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        name: "Weight Gain",
        data: [],
      },
    ],
  });

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
      console.error("Error trying to decode JWT:", error);
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

        const response = await AxiosApi.get("/baby", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const userBabies = response.data.filter(
          (item) => item.user_id == userId
        );
        setBabies(userBabies);

        const selectedBaby = userBabies.length > 0 ? userBabies[0] : null;
        setBabyId(selectedBaby ? selectedBaby.id : "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          navigate("/login");
          return;
        }

        if (!babyId) {
          return;
        }

        const response = await AxiosApi.get(`/weight_gain/${babyId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const weightGainData = response.data;
        const formattedData = {
          labels: weightGainData
            .map((item) => new Date(item.date))
            .sort((a, b) => a - b)
            .map((sortedDate) => format(sortedDate, "dd/MM/yyyy")),
          datasets: [
            {
              name: "Weight Gain",
              data: weightGainData.map((item) => item.weight).reverse(),
            },
          ],
        };

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching weight gain data:", error);
      }
    };

    fetchUserData();
    fetchData();
  }, [babyId, userId, navigate]);

  const handleAddWeight = (newWeight) => {
    setChartData((prevChartData) => {
      const updatedData = {
        labels: [
          ...prevChartData.labels,
          format(new Date(newWeight.date), "dd/MM/yyyy"),
        ].sort((a, b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateA - dateB;
        }),
        datasets: [
          {
            name: "Weight Gain",
            data: [...prevChartData.datasets[0].data, newWeight.weight],
          },
        ],
      };
      return updatedData;
    });
  };

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Dashboard" />
      <DashboardCards />
      {babies.length > 0 ? (
        <DashboardChart chartData={chartData} />
      ) : (
        <FormHelperText 
        style={{
          textAlign: "center",
          fontSize: "1rem",
        }}
        >
          No babies found. Add a baby to see weight gain chart.
        </FormHelperText>
      )}
      <WeightGainForm onAddWeight={handleAddWeight} />
    </>
  );
};
