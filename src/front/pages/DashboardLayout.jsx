import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import "../styles/dashboard.css";

export const DashboardLayout = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No hay token. Usuario no autenticado.");
                navigate("/login");
                return;
            }

            try {
                const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/me", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                if (!resp.ok) {
                    console.error("Error validando sesión");
                    navigate("/login");
                    return;
                }

                const data = await resp.json();
                setUser(data);
            } catch (error) {
                console.error("Error cargando usuario:", error);
                navigate("/login");
            }
        };

        loadUser();
    }, [navigate]);

    if (!user) return <div className="text-center mt-5">Cargando...</div>;

    return (
        <div className="dashboard-container d-flex">
            <Sidebar />
            <div className="main-content flex-grow-1">
                <Header user={user} />
                <div className="container-fluid py-4">
                    <Outlet context={{ user }} />
                </div>
            </div>
        </div>
    );
};
