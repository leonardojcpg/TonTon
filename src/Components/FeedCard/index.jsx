import { Card, CardContent, Typography } from "@mui/material";

const FeedCard = ({ feedingData }) => {
  return (
    <Card style={{ marginBottom: "0.625rem" }}>
      <CardContent>
        <Typography variant="h6">Feeding Time: {feedingData.time}</Typography>
        <Typography variant="body1">Breast Side: {feedingData.side}</Typography>
      </CardContent>
    </Card>
  );
};

export default FeedCard;
