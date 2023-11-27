import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { FormButton } from "../../Components/Button";
import newBornBaby from "./assets/newBornBaby.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosApi } from "../../Axios/axios.create.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const schema = z.object({
    email: z
      .string()
      .email()
      .min(1)
      .refine((data) => data.trim() !== "", {
        message: "email is required",
      }),
    password: z
      .string()
      .min(1)
      .refine((data) => data.trim() !== "", {
        message: "Password is required",
      }),
  });

  const navigate = useNavigate();

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
      localStorage.setItem('authToken', token);
      toast.success("You are logged in!")
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error trying to login");
      console.error("Error trying to login", error)
    }
  };
  
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#BEE9CB",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{ alignItems: "center", padding: 3, borderRadius: ".6rem" }}
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
                helperText={errors.email?.message}
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
                helperText={errors.password?.message}
              />
              <FormButton buttonName="Sign In" />
              <Typography
                variant="body2"
                sx={{ textAlign: "center", marginTop: 2 }}
              >
                Don't have a registration? <a href="/register">Sign Up here!</a>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
