import React from "react";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { ContainerContent } from "../../Components/ContainerContentPage";
import { PageTitle } from "../../Components/PageTitle";
import { DashboardCards } from "../../Components/DashboardCards";
import {DashboardChart} from "../../Components/DashboardChart";

const chartData = {
  labels: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  datasets: [
    {
      name: "Example Weight Gain",
      data: [2.250, 2.50, 2.650, 3.160, 3.40, 3.750, 4.0, 4.25, 4.50, 4.75, 5.0, 5.25],
    },
  ],
};

export const Dashboard = () => {
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