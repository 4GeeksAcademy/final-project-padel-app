import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import StatsGrid from "../components/StatsGrid.jsx";
import MatchesAvailable from "../components/MatchesAvailable.jsx";
import NearbyCourts from "../components/NearbyCourts.jsx";
import MapCard from "../components/MapCard.jsx";
import PlayedMatches from "../components/PlayedMatches.jsx";

import "../styles/dashboard.css";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [matches, setMatches] = useState([]);
    const [stats, setStats] = useState(null);

    // Cargar datos del usuario
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No hay token. Usuario no autenticado.");
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
                    const text = await resp.text();
                    console.error("Error en /api/me:", resp.status, text);
                    return;
                }

                const data = await resp.json();
                setUser(data);

                // Cargar partidos usando el ID real del usuario
                loadMatches(token, data.id);

            } catch (error) {
                console.error("Error cargando usuario:", error);
            }
        };

        loadUser();
    }, []);


    const loadMatches = async (token, userId) => {
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/users/${userId}/matches`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if (!resp.ok) {
                const text = await resp.text();
                console.error("Error cargando matches:", resp.status, text);
                return;
            }

            const data = await resp.json();
            setMatches(data || []);

        } catch (error) {
            console.error("Error cargando matches:", error);
        }
    };


    const loadStats = async (token) => {
        try {
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/stats", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            const data = await res.json();
            setStats(data || null);
        } catch (error) {
            console.error("Error cargando stats:", error);
        }
    };

    if (!user) return <div>Cargando dashboard...</div>;

    return (
        <div className="dashboard-container d-flex">
            <Sidebar user={user} />

            <div className="main-content flex-grow-1">
                <Header user={user} />

                <div className="container-fluid py-4">
                    <StatsGrid stats={stats} />

                    <div className="row mt-4">
                        <div className="col-md-8">
                            <MatchesAvailable matches={matches} />
                            <NearbyCourts />
                        </div>

                        <div className="col-md-4">
                            <MapCard />
                            <PlayedMatches matches={matches} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
