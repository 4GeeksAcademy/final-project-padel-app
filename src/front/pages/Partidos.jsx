import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getListMatches, joinMatch } from "../service/Match";
import MapCard from "../components/MapCard";

const Partidos = () => {
    const { user } = useOutletContext();
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        setLoading(true);
        const data = await getListMatches();
        setMatches(data || []);
        setLoading(false);
    };

    const handleJoin = async (matchId) => {
        try {
            await joinMatch(user.id, matchId);
            alert("¡Te has unido al partido con éxito!");
            loadMatches(); // Reload to update player counts/status
        } catch (error) {
            alert("No se pudo unir al partido. Tal vez ya estás registrado o hay un error.");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left Column: Matches List */}
                <div className="col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold m-0">Partidos Disponibles</h2>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/crear-partido")}
                        >
                            + Crear Partido
                        </button>
                    </div>

                    {loading ? (
                        <p>Cargando partidos...</p>
                    ) : matches.length === 0 ? (
                        <div className="alert alert-info text-center p-5">
                            <h4>No hay partidos disponibles</h4>
                            <p>¡Sé el primero en crear uno y jugar!</p>
                            <button
                                className="btn btn-outline-primary mt-3"
                                onClick={() => navigate("/crear-partido")}
                            >
                                Crear mi primer partido
                            </button>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {matches.map((match) => (
                                <div className="col-md-12" key={match.id}>
                                    <div className="card border-0 shadow-sm p-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="fw-bold mb-1">
                                                    {match.cancha ? match.cancha.nombre : "Cancha desconocida"}
                                                </h5>
                                                <p className="text-muted mb-1 small">
                                                    <i className="fa-regular fa-calendar me-2"></i>
                                                    {match.day ? match.day.split("T")[0] : "Fecha pendiente"} -
                                                    {match.time ? new Date(match.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : " Hora pendiente"}
                                                </p>
                                                <p className="mb-0 text-success small fw-bold">
                                                    {match.type ? `${match.type} jugadores` : "Estándar"}
                                                </p>
                                            </div>

                                            <div className="d-flex flex-column align-items-end gap-2">
                                                <span className="badge bg-light text-dark border">
                                                    {match.participantes ? match.participantes.length : 0} / {match.type || 4}
                                                </span>

                                                {/* Check if user is already in match */}
                                                {match.participantes && match.participantes.some(p => p.id === user.id) ? (
                                                    <button className="btn btn-success btn-sm" disabled>
                                                        Unido
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleJoin(match.id)}
                                                    >
                                                        Unirse
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Optional: Show players avatars underneath */}
                                        {match.participantes && match.participantes.length > 0 && (
                                            <div className="mt-3 d-flex gap-1">
                                                {match.participantes.map(p => (
                                                    <img
                                                        key={p.id}
                                                        src={p.foto || "https://i.pravatar.cc/150?u=" + p.id}
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
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Map */}
                <div className="col-md-4">
                    <MapCard />
                    <div className="mt-3 p-3 bg-white rounded shadow-sm">
                        <h6><i className="fa-solid fa-circle-info text-primary me-2"></i>Información</h6>
                        <p className="small text-muted mb-0">
                            Usa el mapa para ver la ubicación de las canchas. Selecciona una cancha para ver detalles o crear un partido en ella.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partidos;
