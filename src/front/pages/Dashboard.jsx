import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import StatsGrid from "../components/StatsGrid.jsx";
import MatchesAvailable from "../components/MatchesAvailable.jsx";
import NearbyCourts from "../components/NearbyCourts.jsx";
import MapCard from "../components/MapCard.jsx";
import PlayedMatches from "../components/PlayedMatches.jsx";
import { getListCours, fetchNearbyCourts } from "../service/Courts.js";
import "../styles/dashboard.css";
import { getListMatches } from "../service/Match.js";

const Dashboard = () => {

    const { user: contextUser } = useOutletContext();
    const [matches, setMatches] = useState([]);
    const [listMatches, setListMatches] = useState([]);
    const [stats, setStats] = useState({
        total_matches: 15,
        matches_won: 7,
        matches_lost: 8,
        isMock: true
    });
    const [Cours, setCours] = useState([]);

    // Cargar canchas y partidos disponibles
    useEffect(() => {
        getCours();
        getMatches();
    }, []);

    // Cargar datos del usuario
    useEffect(() => {
        if (contextUser?.id) {
            const token = localStorage.getItem("token");
            loadMatches(token, contextUser.id);

            if (contextUser.latitude && contextUser.longitude) {
                fetchNearbyCourts(contextUser.latitude, contextUser.longitude)
                    .then(nearby => {
                        if (nearby?.length > 0) setCours(nearby);
                    })
                    .catch(error => console.error("Error cargando canchas cercanas:", error));
            }
        }
    }, [contextUser]);



    // -------------------------------------------------
    // Cargar partidos del usuario
    const loadMatches = async (token, userId) => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/matches`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!resp.ok) {
                console.error("Error cargando matches:", resp.status);
                return;
            }

            const data = await resp.json();
            setMatches(data || []);
        } catch (error) {
            console.error("Error cargando matches:", error);
        }
    };

    // Calcular estadísticas reales
    useEffect(() => {
        if (!matches?.length) return;

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

    const getCours = async () => {
        try {
            const result = await getListCours();
            setCours(result);
        } catch (error) {
            console.error("Error cargando canchas:", error);
        }
    };

    const getMatches = async () => {
        try {
            const result = await getListMatches();
            setListMatches(result);
        } catch (error) {
            console.error("Error cargando lista de partidos:", error);
        }
    };

    if (!contextUser) return <div>Cargando dashboard...</div>;

    return (
        <div className="row mt-4">
            <div className="col-md-8">
                <StatsGrid stats={stats} />
                <div className="mt-4">
                    <MatchesAvailable matches={matches} data={listMatches} refresh={getMatches} user={contextUser} />
                    <NearbyCourts data={Cours} idUser={contextUser.id} />
                </div>
            </div>

            <div className="col-md-4">
                <MapCard />
                <PlayedMatches matches={matches} />
            </div>
        </div>
    );


};

export default Dashboard;
