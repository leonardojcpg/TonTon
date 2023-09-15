import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Header } from '../../Components/Header';


export const Dashboard = () => {
  const [feedTime, setFeedTime] = useState('');
  const [foodType, setFoodType] = useState('');
  const [feed, setFeed] = useState([]);

  const [diapersTime, setDiapersTime] = useState('');
  const [diapersType, setDiapersType] = useState('');
  const [diapers, setDiapers] = useState([]);

  const [sleepTime, setSleepTime] = useState('');
  const [sleepDuration, setSleepDuration] = useState('');
  const [sleep, setSleep] = useState([]);

  const addFeed = () => {
    if (feedTime && foodType) {
      setFeed([...feed, { horario: feedTime, tipo: foodType }]);
      setFeedTime('');
      setFoodType('');
    }
  };

  const adicionarFraldas = () => {
    if (diapersTime && diapersType) {
      setDiapers([...diapers, { horario: diapersTime, tipo: diapersType }]);
      setDiapersTime('');
      setDiapersType('');
    }
  };

  const addSleep = () => {
    if (sleepTime && sleepDuration) {
      setSleep([...sleep, { horario: sleepTime, duracao: sleepDuration }]);
      setSleepTime('');
      setSleepDuration('');
    }
  };

  return (
    <Container>
        <Header />
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4">Dashboard</Typography>

        {/* Seção de Alimentação */}
        <div>
          <Typography variant="h6">Feeding</Typography>
          <TextField
            label="time"
            variant="outlined"
            value={feedTime}
            onChange={(e) => setFeedTime(e.target.value)}
          />
          <TextField
            label="Tipo de Alimentação"
            variant="outlined"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={addFeed} sx={{ marginLeft: "15px", marginTop: "10px" }}>
            Registrar
          </Button>
          <List>
            {feed.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${item.horario} - ${item.tipo}`} />
              </ListItem>
            ))}
          </List>
        </div>

        {/* Seção de Controle de Fraldas */}
        <div>
          <Typography variant="h6">Controle de Fraldas</Typography>
          <TextField
            label="Horário"
            variant="outlined"
            value={diapersTime}
            onChange={(e) => setDiapersTime(e.target.value)}
          />
          <TextField
            label="Tipo de Fraldas"
            variant="outlined"
            value={diapersType}
            onChange={(e) => setDiapersType(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={adicionarFraldas} sx={{ marginLeft: "15px", marginTop: "10px" }}>
            Registrar
          </Button>
          <List>
            {diapers.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${item.horario} - ${item.tipo}`} />
              </ListItem>
            ))}
          </List>
        </div>

        {/* Seção de Acompanhamento do Sono */}
        <div>
          <Typography variant="h6">Acompanhamento do Sono</Typography>
          <TextField
            label="Horário de Início"
            variant="outlined"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
          />
          <TextField
            label="Duração (em horas)"
            variant="outlined"
            value={sleepTime}
            onChange={(e) => setSleepDuration(e.target.value)}
          />
           <Button variant="contained" color="primary" onClick={addSleep} sx={{ marginLeft: "15px", marginTop: "10px" }}>
            Registrar
          </Button>
          <List>
            {sleep.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${item.horario} - ${item.duracao} horas`} />
              </ListItem>
            ))}
          </List>
        </div>
      </Paper>
    </Container>
  );
}