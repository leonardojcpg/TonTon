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
//import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";



export const FormComponent = () => {
  //const navigate = useNavigate();

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

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

   const handleSignup = async (data) => {
    console.log(data)
  }


  return (
    <Paper elevation={3} sx={{ padding: 3 , borderRadius: ".6rem"}}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img
            src={newBornBaby}
            alt=""
            style={{
              width: "15.625rem",
              height: "15.625rem",
              margin: "0 auto",
              marginTop: "3.438rem",
              marginLeft: "2.5rem",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit(handleSignup)}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Register
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="dense"
              name="email"
              {...register("email")}
              error={!!formState.errors.email}
              helperText={formState.errors.email?.message}
              autoComplete="email"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="dense"
              name="password"
              type="password"
              {...register("password")}
              error={!!formState.errors.password}
              helperText={formState.errors.password?.message}
              autoComplete="current-password"
            />
            <InputLabel style={{ color: "#000" }}>
              Relationship with the baby
            </InputLabel>
            <Select
              label="Relationship with the baby"
              variant="outlined"
              fullWidth
              defaultValue="parent"
              margin="dense"
              name="relationship"
              {...register("relationship")}
              error={!!formState.errors.relationship}
              autoComplete="relationship"
            >
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="grandparent">Grandparent</MenuItem>
              <MenuItem value="sibling">Sibling</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {formState.errors.relationship && (
              <Typography variant="caption" color="error">
                {formState.errors.relationship.message}
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
  );
};
