import React from "react";
import { Container } from "@mui/material";
import { FormComponent } from "../../Components/Form";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (data) => {
    // user registration logic here!
    const registrationSuccessful = true;

    if(registrationSuccessful){
      navigate("/dashboard")
    }
  };

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
      <FormComponent onSubmitCallback={handleRegister} />
    </Container>
  );
};
