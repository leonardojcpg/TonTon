import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { ContainerContent } from "../../Components/ContainerContentPage";
import { PageTitle } from "../../Components/PageTitle";
import { DashboardCards } from "../../Components/DashboardCards";
import { DashboardChart } from "../../Components/DashboardChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosApi } from "../../Axios/axios.create";
import { format } from "date-fns";
import { WeightGainForm } from "../../Components/WeightGainForm";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [babyId, setBabyId] = useState(null);
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

        const response = await AxiosApi.get("/baby", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const userBabies = response.data.filter(
          (item) => item.user_id == userId
        );
        if (userBabies.length === 0) {
          console.error("User has no associated babies.");
          return;
        }

        setBabyId(userBabies[0].id);
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

        const response = await AxiosApi.get(`/weight_gain/${babyId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const weightGainData = response.data;
        console.log(weightGainData);
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
  }, []);

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
      <DashboardChart chartData={chartData} />
      <WeightGainForm onAddWeight={handleAddWeight} />
      <ContainerContent />
    </>
  );
};
