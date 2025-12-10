import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
<<<<<<< HEAD
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
=======
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PrivateRoute } from "./components/PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="demo" element={<Demo />} />
        <Route path="single/:id" element={<Single />} />
      </Route>
    </>
>>>>>>> d5330ba (asdd)
  )
);
