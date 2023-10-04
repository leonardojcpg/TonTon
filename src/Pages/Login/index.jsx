import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { FormButton } from "../../Components/Button";
import newBornBaby from "./assets/newBornBaby.svg";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Type a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  })


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Dados do formulário:", data);
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
    }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
