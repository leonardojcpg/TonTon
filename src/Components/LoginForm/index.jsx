// LoginForm.jsx
import React from "react";
import { TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton } from "../../Components/Button";
import { AxiosApi } from "../../Services/axios.create.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../Components/ErrorMessage/index.jsx";

export const LoginForm = () => {
  const navigate = useNavigate();

  const schema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Type a valid email"),
    password: z
      .string()
      .min(4, "Password is required")
      .refine((data) => /[A-Z]/.test(data), "Password must contain at least one uppercase letter")
      .refine((data) => /\d/.test(data), "Password must contain at least one number"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const loginUser = async (data) => {
    try {
      const response = await AxiosApi.post("/login", data);
      const { token } = response.data;

      localStorage.setItem("authToken", token);

      toast.success("You are logged in!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error trying to login");
      console.error("Error trying to login", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        {...register("email")}
        error={!!errors.email}
        helperText={<ErrorMessage message={errors.email?.message} />}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        name="password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={<ErrorMessage message={errors.password?.message} />}
      />
      <FormButton buttonName="Sign In" />
      <Typography variant="body2" sx={{ textAlign: "center", marginTop: 2 }}>
        Don't have a registration? <a href="/register">Sign Up here!</a>
      </Typography>
    </form>
  );
};
