import { Container, Grid, Paper } from "@mui/material";
import { PageTitle } from "../../Components/PageTitle";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";

export const Diapers = () => {
  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Diapers" />
      <Paper
        elevation={3}
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
            style={{ margin: "1rem", marginLeft: "3rem" }}
          ></Grid>
        </Container>
      </Paper>
    </>
  );
};
