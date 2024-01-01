import { TextField } from "@mui/material";

export const PasswordField = ({ register, formState }) => (
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
);
