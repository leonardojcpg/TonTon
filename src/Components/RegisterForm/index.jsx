// FormComponent.jsx
import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosApi } from "../../Services/axios.create.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormButton } from "../Button/index.jsx";
import newBornBaby from "./assets/newBornBaby.svg";
import { NameField } from "../InputsForm/NameField/index.jsx";
import { EmailField } from "../InputsForm/EmailField/index.jsx";
import { RelationshipField } from "../InputsForm/RelationshipField/index.jsx";
import { PasswordField } from "../InputsForm/PasswordField/index.jsx";
import { ErrorMessage } from "../ErrorMessage/index.jsx";

export const FormComponent = () => {
  const navigate = useNavigate();
  const schema = z.object({
    name: z
      .string()
      .min(3)
      .max(50)
      .refine((data) => data.trim() !== "", {
        message: "Type your name",
      }),
    email: z
      .string()
      .email("Type a valid email")
      .refine((data) => data.trim() !== "", {
        message: "Email is required",
      }),
    password: z
      .string()
      .min(4)
      .refine((data) => data.trim() !== "", {
        message: "Password is required",
      })
      .refine((data) => /[A-Z]/.test(data), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((data) => /\d/.test(data), {
        message: "Password must contain at least one number",
      }),
    relationship: z
      .string()
      .refine(
        (data) => ["parent", "grandparent", "other"].includes(data.trim()),
        {
          message: "Invalid relationship",
        }
      )
      .refine((data) => data.trim() !== "", {
        message: "Relationship is required",
      }),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSignup = async (data) => {
    try {
      await AxiosApi.post("/users", data);
      toast.success("You are successfully registered!");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error("Error during registration:", error);
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ alignItems: "center", padding: 4, borderRadius: "1rem" }}
    >
      <Grid container spacing={3} sx={{ alignItems: "center" }}>
        <Grid item xs={12} sm={6}>
          <img
            src={newBornBaby}
            alt=""
            style={{
              width: "15.625rem",
              height: "15.625rem",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit(handleSignup)}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Register
            </Typography>

            <NameField register={register} formState={formState} />
            <EmailField register={register} formState={formState} />
            <PasswordField register={register} formState={formState} />
            <RelationshipField register={register} formState={formState} />
            {formState.errors.relationship && (
              <ErrorMessage message={formState.errors.relationship.message} />
            )}

            <FormButton
              onClick={handleSubmit(handleSignup)}
              buttonName="Sign Up"
            />
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginTop: 2 }}
            >
              Already registered? <a href="/login">Log in here!</a>
            </Typography>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};
