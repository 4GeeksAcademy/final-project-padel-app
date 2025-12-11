import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { LandingPage } from "./pages/LandingPage";
import Login from "./pages/Login";
import { Registro } from "./pages/Registro";
import Dashboard from "./pages/Dashboard"; 

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </>
  )
);
      
