// NameField.jsx
import { TextField } from "@mui/material";

export const NameField = ({ register, formState }) => (
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
);
