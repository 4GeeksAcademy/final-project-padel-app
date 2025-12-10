import React from 'react'
import ReactDOM from 'react-dom/client'
<<<<<<< HEAD
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
=======
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from './hooks/useGlobalReducer';
import { AuthProvider } from './hooks/useAuth';
>>>>>>> d5330ba (asdd)
import { BackendURL } from './components/BackendURL';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


const Main = () => {
<<<<<<< HEAD

    if (! import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
        <React.StrictMode>
            <BackendURL />
        </React.StrictMode>
    );
    return (
        <React.StrictMode>
            {/* Provide global state to all components */}
            <StoreProvider>
                {/* Set up routing for the application */}
                <RouterProvider router={router}>
                </RouterProvider>
            </StoreProvider>
        </React.StrictMode>
=======
    if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
        <BackendURL />
    );

    return (
        <StoreProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </StoreProvider>
>>>>>>> d5330ba (asdd)
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
