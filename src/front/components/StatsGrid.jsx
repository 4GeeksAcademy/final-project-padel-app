import React, { useEffect, useState } from "react";

const StatsGrid = () => {

    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch(process.env.BACKEND_URL + "/api/user/stats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Estadísticas cargadas:", data);
                setStats(data);
            })
            .catch(err => console.error("Error stats:", err));
    }, []);

    if (!stats) return <div>Cargando estadísticas...</div>;

    return (
        <div className="stats-grid row">
            <div className="col-md-4 card p-3 text-center">
                <h5>Total partidos</h5>
                <h2>{stats.total_partidos}</h2>
            </div>

            <div className="col-md-4 card p-3 text-center">
                <h5>Victorias</h5>
                <h2>{stats.victorias}</h2>
            </div>

            <div className="col-md-4 card p-3 text-center">
                <h5>Derrotas</h5>
                <h2>{stats.derrotas}</h2>
            </div>
        </div>
    );
};

export default StatsGrid;
