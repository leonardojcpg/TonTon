import {  MenuItem, Select, Typography } from "@mui/material";

export const RelationshipField = ({ register, formState }) => (
  <>
    <Typography style={{ color: "#333", marginTop: ".5rem" }}>
      Relationship with the baby
    </Typography>
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
  </>
);