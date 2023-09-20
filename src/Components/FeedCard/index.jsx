import React from "react";
import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const FeedCard = ({ feedingData }) => {
  return (
    <Paper elevation={3} style={{ padding: "1rem", marginBottom: "1rem" }}>
      <Typography variant="h6">Feeding Details:</Typography>
      <List>
        {feedingData.map((data, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Time: ${data.time} - Breast Side: ${data.side}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Paper>
  );
};

export default FeedCard;
