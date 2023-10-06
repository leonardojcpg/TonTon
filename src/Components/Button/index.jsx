import { Button } from "@mui/material";

export const FormButton = ({buttonName, onClickCallback}) => {

  const handleButtonClick = () => {

    if(onClickCallback){
      onClickCallback()
    }
  }

  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        fullWidth
        sx={{
          marginTop: 2,
          backgroundColor: "#5D915D",
          "&:hover": {
            backgroundColor: "#D6FFD6",
            borderColor: "#D6FFD6",
            color: "#5D915D",
            transition: "ease-in .1s",
          },
        }}
      >
        {buttonName}
      </Button>
    </>
  );
};
