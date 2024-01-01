// Login.jsx
import React from "react";
import { Container, Grid, Paper, useMediaQuery } from "@mui/material";
import newBornBaby from "./assets/newBornBaby.svg";
import { LoginForm } from "../../Components/LoginForm/index.jsx";
import "./styles.css";

export const Login = () => {
  const isSmallScreen = useMediaQuery("(max-width:813px)");

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: isSmallScreen ? "#bee9cb" : "#bee9cb",
      }}
    >
      <div className="container-title">
        <span>T</span>
        <span>o</span>
        <span>n</span>
        <span>T</span>
        <span>o</span>
        <span>n</span>
      </div>
      <Paper
        elevation={3}
        sx={{ alignItems: "center", padding: 4, borderRadius: "1rem" }}
      >
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid item xs={12} sm={6} sx={{ alignItems: "center" }}>
            <img
              src={newBornBaby}
              alt=""
              style={{
                width: "15.625rem",
                height: "15.625rem",
                display: "block",
                margin: "0 auto",
                alignItems: "center",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LoginForm />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
