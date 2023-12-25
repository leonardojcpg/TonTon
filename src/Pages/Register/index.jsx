import React from "react";
import { Container } from "@mui/material";
import { FormComponent } from "../../Components/RegisterForm";

export const Register = () => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <FormComponent />
    </Container>
  );
};
