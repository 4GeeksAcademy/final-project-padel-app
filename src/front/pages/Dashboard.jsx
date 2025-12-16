import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import StatsGrid from "../components/StatsGrid.jsx";
import MatchesAvailable from "../components/MatchesAvailable.jsx";
import NearbyCourts from "../components/NearbyCourts.jsx";
import MapCard from "../components/MapCard.jsx";
import PlayedMatches from "../components/PlayedMatches.jsx";
import { getListCours } from "../service/Courts.js";
import "../styles/dashboard.css";

const Dashboard = () => {
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState([]);
    const [matches, setMatches] = useState([]);
    const [stats, setStats] = useState({
        total_matches: 15,
        matches_won: 7,
        matches_lost: 8,
        isMock: true  
    });
    const [Cours, setCours] = useState([]);
    const [filters, setFilters] = useState({
        text: "",
        date: "",
        distance: ""
    });
    useEffect(() => {
        // const loadUser = async () => {
        //     const token = localStorage.getItem("token");

        //     if (!token) {
        //         console.error("No hay token. Usuario no autenticado.");
        //         return;
        //     }

        //     try {
        //         const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/me", {
        //             method: "GET",
        //             headers: {
        //                 "Authorization": "Bearer " + token
        //             }
        //         });

        //         if (!resp.ok) {
        //             const text = await resp.text();
        //             console.error("Error en /api/me:", resp.status, text);
        //             return;
        //         }

        //         const data = await resp.json();
        //         console.log([data]);
                
        //         setUser([data]);
        //         getCours ();
          
        //         // Cargar partidos usando el ID real del usuario
        //         loadMatches(token, data.id);

        //     } catch (error) {
        //         console.error("Error cargando usuario:", error);
        //     }
        // };
        getCours ();
        loadUser();
    }, []);


    //Cargando datos del usuario logueado
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
                console.log(data);
                
                setUser(data);
                
          
                // Cargar partidos usando el ID real del usuario
                loadMatches(token, data.id);

            } catch (error) {
                console.error("Error cargando usuario:", error);
            }
        };

    // Cargar partidos del usuario
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

    useEffect(() => {
        if (!matches) return;
        if (matches.length === 0) return;

        // DESDE AQUÍ TODO ES REAL
        const total = matches.length;
        const won = matches.filter(m => m.status === "won").length;
        const lost = matches.filter(m => m.status === "lost").length;

        setStats({
            total_matches: total,
            matches_won: won,
            matches_lost: lost,
            isMock: false
        });

    }, [matches]);

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


    const getCours = async () => {
        const result = await getListCours();
        setCours(result);
        console.log(result);
    };

    // Renderizado
    if (!user) return <div>Cargando dashboard...</div>;

    return (
        <div className="dashboard-container d-flex">
            <Sidebar user={user} />

            <div className="main-content flex-grow-1">
                {/*AÑADIDO: se pasan filtros al Header */}
                <Header user={user} filters={filters} setFilters={setFilters} />

                <div className="container-fluid py-4">
                    <StatsGrid stats={stats} />

                    <div className="row mt-4">
                        <div className="col-md-8">
                            {/*AÑADIDO: filtros */}
                            <MatchesAvailable matches={matches} filters={filters} />
                            <NearbyCourts data={Cours} idUser={user.id} filters={filters} />
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
