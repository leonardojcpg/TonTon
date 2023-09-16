import React from "react";
import { Container } from "@mui/material";
import { FormComponent } from "../../Components/Form";

export const Register = () => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#a4dfa4",
        justifyContent: "center",
        height: "100vh",
      }}  
    >
      <FormComponent />
    </Container>
  );
};
