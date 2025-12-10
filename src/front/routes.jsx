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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      
      {/* Rutas hijas */}
      <Route index element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/registro" element={<Registro />} />

    </Route>
  )
);
