import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { ContainerContent } from "../../Components/ContainerContentPage";
import { PageTitle } from "../../Components/PageTitle";
import { DashboardCards } from "../../Components/DashboardCards";
import { DashboardChart } from "../../Components/DashboardChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosApi } from "../../Axios/axios.create";
import { format } from "date-fns";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        name: "Example Weight Gain",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          navigate("/login");
          return;
        }

        const response = await AxiosApi.get("/weight_gain", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const weightGainData = response.data;
        const formattedData = {
          labels: weightGainData.map((item) =>
            format(new Date(item.date), "dd/MM/yy")
          ),
          datasets: [
            {
              name: "Weight Gain",
              data: weightGainData.map((item) => item.weight),
            },
          ],
        };

        setChartData(formattedData);
      } catch (error) {
        console.error("Erro ao obter dados do gráfico:", error.message);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Dashboard" />
      <DashboardCards />
      <DashboardChart chartData={chartData} />
      <ContainerContent />
    </>
  );
};
