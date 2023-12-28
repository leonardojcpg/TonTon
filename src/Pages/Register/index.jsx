import React from "react";
import { Container, useMediaQuery } from "@mui/material";
import { FormComponent } from "../../Components/RegisterForm";

export const Register = () => {
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
      <FormComponent />
    </Container>
  );
};
