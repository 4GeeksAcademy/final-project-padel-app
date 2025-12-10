import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from './hooks/useGlobalReducer';
import { AuthProvider } from './hooks/useAuth';
import { BackendURL } from './components/BackendURL';

const Main = () => {
    if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
        <BackendURL />
    );

    return (
        <StoreProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </StoreProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
