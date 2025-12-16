import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import StatsGrid from "../components/StatsGrid.jsx";
import MatchesAvailable from "../components/MatchesAvailable.jsx";
import NearbyCourts from "../components/NearbyCourts.jsx";
import MapCard from "../components/MapCard.jsx";
import PlayedMatches from "../components/PlayedMatches.jsx";
import { getListCours, fetchNearbyCourts } from "../service/Courts.js";
import "../styles/dashboard.css";
import { getListMatches } from "../service/Match.js"

const Dashboard = () => {
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState([]);
    const [matches, setMatches] = useState([]);
    const [listMatches, setListMatches] = useState([]);
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
        getMatches()
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

            // Fetch nearby courts if location is available
            if (data.latitude && data.longitude) {
                console.log("Fetching nearby courts using user location...");
                const nearby = await fetchNearbyCourts(data.latitude, data.longitude);
                if (nearby && nearby.length > 0) setCours(nearby);
            } else {
                console.log("User has no location, trying browser geolocation...");
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        console.log("Browser location:", lat, lon);
                        const nearby = await fetchNearbyCourts(lat, lon);
                        if (nearby && nearby.length > 0) setCours(nearby);
                    }, (error) => {
                        console.error("Geolocation error:", error);
                    });
                }
            }

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
    const getMatches = async () => {
        const result = await getListMatches();
        setListMatches(result);
        console.log(result);
    }
    // -------------------------------------------------
    // Renderizado
    // -------------------------------------------------
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
                            <MatchesAvailable matches={matches} data={listMatches} />
                            <NearbyCourts data={Cours} idUser={user.id} />
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
