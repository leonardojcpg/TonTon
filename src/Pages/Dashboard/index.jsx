import React from "react";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { ContainerContent } from "../../Components/ContainerContentPage";
import { PageTitle } from "../../Components/PageTitle";
import { DashboardCards } from "../../Components/DashboardCards";

export const Dashboard = () => {

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Dashboard" />
      <DashboardCards  />
      <ContainerContent />
    </>
  );
};
