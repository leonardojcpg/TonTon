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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {AxiosApi} from "../../Axios/axios.create.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const FormComponent = () => {
  const navigate = useNavigate(); // Obtenha a função de navegação
  //form schema
  const schema = z.object({
    name: z
      .string().min(3).max(50)
      .refine((data) => data.trim() !== "", {
        message: "Type your name",
      }),
    email: z
      .string().email("Type a valid email")
      .refine((data) => data.trim() !== "", {
        message: "Email is required",
      }),
    password: z
      .string().min(4)
      .refine((data) => data.trim() !== "", {
        message: "Password is required",
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
      toast.success("You are successfully registered!")
      navigate("/login")
    } catch (error) {
      toast.error("Erro no registro:", error);
    }
  };
  
  

  return (
    <Paper
      elevation={3}
      sx={{ alignItems: "center", padding: 3, borderRadius: ".6rem" }}
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
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="dense"
              {...register("name")}
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message}
              autoComplete="name"
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="dense"
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
              {...register("relationship")}
              error={!!formState.errors.relationship}
              autoComplete="relationship"
            >
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="grandparent">Grandparent</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {formState.errors.relationship && (
              <Typography variant="caption" color="error">
                {formState.errors.relationship.message}
              </Typography>
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
