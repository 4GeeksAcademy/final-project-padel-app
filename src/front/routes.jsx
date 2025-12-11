import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Dashboard from "./pages/Dashboard.jsx";
import { Registro } from "./pages/Registro";
import Partidos from "./pages/Partidos.jsx";
import Jugadores from "./pages/Jugadores.jsx";
import Cancha from "./pages/Cancha.jsx";
import CrearPartido from "./pages/CrearPartido.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

      {/* Rutas hijas */}
      <Route index element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/partidos" element={<Partidos />} />
      <Route path="/jugadores" element={<Jugadores />} />
      <Route path="/cancha/:id" element={<Cancha />} />
      <Route path="/crear-partido" element={<CrearPartido />} />
      <Route path="*" element={<h1>Not found!</h1>} />
      <Route path="/rankings" element={<h1>Rankings</h1>} />
      <Route path="/ajustes" element={<h1>Ajustes</h1>} />
    </Route>
  )
);
