import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState([]);
    const [matches, setMatches] = useState([]);
    const [stats, setStats] = useState({
        total_matches: 15,
        matches_won: 7,
        matches_lost: 8,
        isMock: true  // esto es pa colcoar número per se borran cuando el usuario registre datos
    });
    const [Cours, setCours] = useState([]);

    
    // -------------------------------------------------
    // Cargar datos del usuario autenticado
    // -------------------------------------------------
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
        getCours();
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

    
    // -------------------------------------------------
    // Cargar partidos del usuario
    // -------------------------------------------------
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

        // 👇 SI NO HAY PARTIDOS REALES, NO TOCAMOS EL MOCK
        if (matches.length === 0) return;

        // 👇 DESDE AQUÍ TODO ES REAL
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

    // -------------------------------------------------
    // (Opcional) estadísticas — tu backend NO tiene este endpoint
    // Por ahora no se usa, pero lo dejo comentado por si lo implementas luego
    // -------------------------------------------------

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


    }
    // -------------------------------------------------
    // Renderizado
    // -------------------------------------------------
    if (!user) return <div>Cargando dashboard...</div>;

    return (
        <div className="dashboard-wrapper">

            {/* NAVBAR SUPERIOR */}
            <Header user={user} />

            <div className="dashboard-shell">

                {/* SIDEBAR */}
                <Sidebar user={user} />

                {/* CONTENIDO */}
                <main className="main-content">

                    {/* ESTADÍSTICAS ARRIBA */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <StatsGrid stats={stats} />
                        </div>
                    </div>

                    {/* CONTENIDO PRINCIPAL */}
                    <div className="row">
                        <div className="col-md-8">
                            <MatchesAvailable matches={matches} />
                            <NearbyCourts data={Cours} idUser={user.id} />
                        </div>

                        <div className="col-md-4">
                            <MapCard />
                            <PlayedMatches matches={matches} />
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );


};

export default Dashboard;
