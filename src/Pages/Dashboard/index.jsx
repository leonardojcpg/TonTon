import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { ContainerContent } from "../../Components/ContainerContentPage";
import { PageTitle } from "../../Components/PageTitle";
import { DashboardCards } from "../../Components/DashboardCards";
import { DashboardChart } from "../../Components/DashboardChart";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const chartData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      name: "Example Weight Gain",
      data: [2.25, 2.5, 2.65, 3.16, 3.4, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0, 5.25],
    },
  ],
};

export const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
  }, []);

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
