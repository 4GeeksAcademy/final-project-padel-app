import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteMatch, joinMatch } from "../service/Match.js";

const MatchesAvailable = ({ data = [], refresh, user }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este partido?")) {
            const result = await deleteMatch(id);
            if (result) {
                refresh(); 
            }
        }
    };

    const handleJoin = async (matchId) => {
        if (!user?.id) {
            alert("Debes iniciar sesión para unirte a un partido");
            return;
        }

        try {
            await joinMatch(user.id, matchId);
            alert("¡Te has unido al partido con éxito!");
            refresh(); // Reload to update player counts/status
        } catch (error) {
            console.error("Error joining match:", error);
            alert("No se pudo unir al partido. Tal vez ya estás registrado o el partido está lleno.");
        }
    };

    const isUserInMatch = (match) => {
        if (!user?.id || !match.participantes) return false;
        return match.participantes.some(p => p.id === user.id);
    };

    const isMatchFull = (match) => {
        const maxPlayers = parseInt(match.type) || 4;
        const currentPlayers = match.participantes?.length || 0;
        return currentPlayers >= maxPlayers;
    };

    return (
        <div className="card p-4 mb-4 dashboard-card">
            <h5 className="fw-bold mb-3">Partidos Disponibles</h5>
            <div className="row g-3">
                {data && data.length > 0 ? (
                    data.map((i) => {
                        const userInMatch = isUserInMatch(i);
                        const matchFull = isMatchFull(i);

                        return (
                            <div className="col-md-6" key={i.id}>
                                <div className="border rounded p-3 shadow-sm">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div>
                                            <strong>
                                                {i.day ? new Date(i.day).toLocaleDateString("es-ES") : "S/D"} - 
                                                {i.time?.includes("T") ? i.time.split("T")[1].slice(0, 5) : i.time}
                                            </strong>
                                            <p className="text-muted m-0">
                                                {i.cancha?.nombre || "Cancha no definida"}
                                            </p>
                                        </div>
                                        <span className="badge bg-info text-dark">Amateur</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className="text-muted">Jugadores: {i.participantes?.length || 0} / {i.type || 4}</span>
                                        <div className="btn-group gap-2">
                                            <button 
                                                className="btn btn-outline-danger btn-sm border-0" 
                                                onClick={() => handleDelete(i.id)}
                                                title="Eliminar partido"
                                            >
                                                <i className="fa-solid fa-trash-can"></i> Borrar
                                            </button>
                                            
                                            {userInMatch ? (
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    disabled
                                                >
                                                    Unido
                                                </button>
                                            ) : matchFull ? (
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    disabled
                                                >
                                                    Completo
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleJoin(i.id)}
                                                >
                                                    Unirse
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Show participant avatars */}
                                    {i.participantes && i.participantes.length > 0 && (
                                        <div className="mt-3 d-flex gap-1">
                                            {i.participantes.map(p => (
                                                <img
                                                    key={p.id}
                                                    src={p.foto || `https://i.pravatar.cc/150?u=${p.id}`}
                                                    alt={p.username}
                                                    className="rounded-circle border border-white"
                                                    width="30"
                                                    height="30"
                                                    title={p.username}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-muted">No hay partidos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default MatchesAvailable;