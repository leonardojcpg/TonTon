import { TextField } from "@mui/material";

export const EmailField = ({ register, formState }) => (
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
);