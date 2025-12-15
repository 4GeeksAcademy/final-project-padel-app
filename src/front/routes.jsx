import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { LandingPage } from "./pages/LandingPage";
import Login from "./pages/Login";
import { Registro } from "./pages/Registro";
import Partidos from "./pages/Partidos.jsx";
import Jugadores from "./pages/Jugadores.jsx";
import Cancha from "./pages/Cancha.jsx";
import CrearPartido from "./pages/CrearPartido.jsx";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/partidos" element={<Partidos />} />
      <Route path="/jugadores" element={<Jugadores />} />
      <Route path="/cancha/:id" element={<Cancha />} />
      <Route path="/crear-partido" element={<CrearPartido />} />
      <Route path="*" element={<h1>Not found!</h1>} />
      <Route path="/rankings" element={<h1>Rankings</h1>} />
      <Route path="/ajustes" element={<h1>Ajustes</h1>} />
    </>

  )
);

