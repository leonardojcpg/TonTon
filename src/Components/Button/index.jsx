import { Button } from "@mui/material";

export const FormButton = ({buttonName}) => {
  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          marginTop: 2,
          backgroundColor: "#508b50",
          "&:hover": {
            backgroundColor: "#75ca75",
            borderColor: "#75ca75",
            color: "#fff",
          },
        }}
      >
        {buttonName}
      </Button>
    </>
  );
};
