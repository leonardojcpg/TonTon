import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const InfoList = ({ data }) => {
  return (
    <List>
      {data.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={`${item.time || item.startTime} - ${item.side || item.endTime} horas`} />
        </ListItem>
      ))}
    </List>
  );
};

export default InfoList;
