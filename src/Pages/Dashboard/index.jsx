import {
  Typography
} from "@mui/material"

import { ResponsiveHeader } from "../../Components/ResponsiveHeader"
import { ContainerContent } from "../../Components/ContainerContentPage"
import { PageTitle } from "../../Components/PageTitle"

export const Dashboard = () => {
  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Dashboard" />
      <ContainerContent />
      <Typography variant="h4">Dashboard</Typography>
     </>
  );
};
