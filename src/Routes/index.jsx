import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../Pages/Register";
import { Dashboard } from "../Pages/Dashboard";
import {Login} from "../Pages/Login"

export const RouteApp = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  );
};
