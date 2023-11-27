import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Dashboard } from "../Pages/Dashboard";
import { BreastFeeding } from "../Pages/BreastFeeding";
import { Sleep } from "../Pages/Sleep";
import { Register } from "../Pages/Register";
import { Baby } from "../Pages/Baby";
import { Diapers } from "../Pages/Diapers";
import { Diary } from "../Pages/Diary";

export const RouteApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/breastfeeding" element={<BreastFeeding />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/baby" element={<Baby />} />
        <Route path="/diapers" element={<Diapers />} />
        <Route path="/diary" element={<Diary />} />
      </Routes>
    </Router>
  );
};
