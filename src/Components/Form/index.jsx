import {
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { FormButton } from "../Button";
import newBornBaby from "./assets/newBornBaby.svg";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const FormComponent = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Type a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    relationship: Yup.string()
      .oneOf(
        ["parent", "grandparent", "sibling", "other"],
        "Invalid relationship"
      )
      .required("Relationship is required"),
  });

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
    <>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <img
              src={newBornBaby}
              alt=""
              style={{
                width: "250px",
                height: "250px",
                margin: "0 auto",
                marginTop: "55px",
                marginLeft: "40px",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Register
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
              <InputLabel>Relationship with the baby</InputLabel>
              <Select
                label="Relationship with the baby"
                variant="outlined"
                fullWidth
                margin="normal"
                name="relationship"
                {...register("relationship")}
                error={!!errors.relationship}
              >
                <MenuItem value="parent">Parent</MenuItem>
                <MenuItem value="grandparent">Grandparent</MenuItem>
                <MenuItem value="sibling">Sibling</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.relationship && (
                <Typography variant="caption" color="error">
                  {errors.relationship.message}
                </Typography>
              )}
              <FormButton buttonName="Sign Up" />
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
    </>
  );
};
