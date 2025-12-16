import React from "react";
import { useNavigate } from "react-router-dom";

const MatchesAvailable = ({ matches = [], filters }) => {
    const navigate = useNavigate();

    const filteredMatches = matches
        .filter((match) =>
            match.courtName.toLowerCase().includes(filters.text.toLowerCase())
        )
        .filter((match) =>
            filters.date ? match.date === filters.date : true
        );

    return (
        <div className="card p-4 mb-4 dashboard-card">
            <h5 className="fw-bold mb-3">Partidos Disponibles</h5>

            <div className="row g-3">
                {filteredMatches.length > 0 ? (
                    filteredMatches.map((match) => (
                        <div className="col-md-6" key={match.id}>
                            <div className="border rounded p-3">
                                <strong>{match.date} - {match.time}</strong>
                                <p className="text-muted m-0">
                                    {match.courtName}
                                </p>

                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <span className="text-muted">
                                        Jugadores: {match.players}/{match.maxPlayers}
                                    </span>

                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => navigate("/partidos")}
                                    >
                                        Unirse
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No hay partidos con esos filtros</p>
                )}
            </div>
        </div>
    );
};

export default MatchesAvailable;