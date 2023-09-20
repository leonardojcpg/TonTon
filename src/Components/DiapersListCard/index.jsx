// DiapersListCard.js
import React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

const DiapersListCard = ({ diapers }) => {
  const diapersBySize = {};
  diapers.forEach((diaper) => {
    if (!diapersBySize[diaper.type]) {
      diapersBySize[diaper.type] = [];
    }
    diapersBySize[diaper.type].push(diaper);
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Lista de Fraldas por Tamanho</Typography>
        {Object.keys(diapersBySize).map((size) => (
          <div key={size}>
            <Typography variant="subtitle1">{size}</Typography>
            <ul>
              {diapersBySize[size].map((diaper, index) => (
                <li key={index}>{`${diaper.time} - Quantity: ${diaper.quantity}`}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DiapersListCard;
