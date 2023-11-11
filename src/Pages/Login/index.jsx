import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { FormButton } from "../../Components/Button";
import newBornBaby from "./assets/newBornBaby.svg";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Api } from "../../Service/api";

export const Login = () => {
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Type a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loginUser = async (data) => {
    try {
      const response = await fetch(`${Api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        if (responseData.token) {
          localStorage.setItem("token", responseData.token);
          navigate("/dashboard");
        }
      } else {
        // Trate erros de autenticação aqui
        console.error("Authentication error:", response);
      }
    } catch (error) {
      console.error(error);
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
      <Paper elevation={3} sx={{ padding: 3, borderRadius: "0.6rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <img
              src={newBornBaby}
              alt=""
              style={{
                width: "15.625rem",
                height: "16.25rem",
                margin: "0 auto",
                marginTop: "2.188rem",
                marginLeft: "2.5rem",
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
