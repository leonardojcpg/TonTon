import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from '../Pages/Register';
import { Login } from '../Pages/Login';
import { Dashboard } from '../Pages/Dashboard';
import { BreastFeeding } from '../Pages/BreastFeeding';
import { Sleep } from '../Pages/Sleep';

export const RouteApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/breastfeeding" element={<BreastFeeding />} />
        <Route path="/sleep" element={<Sleep />} />

      </Routes>
    </Router>
  );
};
