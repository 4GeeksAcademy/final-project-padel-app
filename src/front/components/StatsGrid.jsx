import React from "react";

const StatsGrid = ({ stats }) => {
    console.log("STATS =>", stats);

    if (!stats) return (
        <div className="card p-4 dashboard-card">

            <h5>Estadísticas</h5>
            <p>Cargando estadísticas...</p>
        </div>
    );

    return (
        <div className="card p-3 dashboard-card stats-card">

            <h5>Estadísticas</h5>

            <div className="row text-center">

                <div className="col-md-4">
                    <h3>{stats.total_matches}</h3>
                    <p>Partidos Jugados</p>
                </div>

                <div className="col-md-4">
                    <h3>{stats.matches_won}</h3>
                    <p>Partidos Ganados</p>
                </div>

                <div className="col-md-4">
                    <h3>{stats.matches_lost}</h3>
                    <p>Partidos Perdidos</p>
                </div>

            </div>
        </div>
    );
};

export default StatsGrid;
