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

    // ESTADO DEL USUARIO
    const [user, setUser] = useState(null);

    // CARGAR DATOS DEL USUARIO
    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/me", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch((err) => console.error("Error cargando usuario:", err));
    }, []);
console.log("BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

    if (!user) return <div>Cargando dashboard...</div>;

    return (
        <div className="dashboard-container d-flex">

            <Sidebar user={user} />

            <div className="main-content flex-grow-1">
                <Header user={user} />

                <div className="container-fluid py-4">

                    <StatsGrid />

                    <div className="row mt-4">

                        <div className="col-md-8">
                            <MatchesAvailable />
                            <NearbyCourts />
                        </div>

                        <div className="col-md-4">
                            <MapCard />
                            <PlayedMatches />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

