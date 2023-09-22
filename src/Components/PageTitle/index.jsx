import { Typography } from "@mui/material";

export const PageTitle = ({ pageTitle }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#508b50",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <Typography variant="h4" style={{ color: "#fff" }}>
          {pageTitle}
        </Typography>
      </div>
    </>
  );
};
