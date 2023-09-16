import React from "react";
import { 
  Box,
    Card, 
    CardContent, 
    Typography
} from "@mui/material";


const FeedCard = ({ feedingData }) => {
  const { time, side } = feedingData;

  return (
    <Box>
    <Card variant="outlined" style={{ marginBottom: "8px", color: "#141414" }}>
      <CardContent>
        <Typography variant="h6">
          Feeding Time: {time}
        </Typography>
        <Typography variant="body2">Breast Side: {side}</Typography>
      </CardContent>
    </Card>
    </Box>
  );
};


export default FeedCard;
