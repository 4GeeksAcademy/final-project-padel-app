import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteMatch } from "../service/Match.js";

const MatchesAvailable = ({ data = [], refresh }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este partido?")) {
            const result = await deleteMatch(id);
            if (result) {
                refresh(); 
            }
        }
    };

    return (
        <div className="card p-4 mb-4 dashboard-card">
            <h5 className="fw-bold mb-3">Partidos Disponibles</h5>
            <div className="row g-3">
                {data && data.length > 0 ? (
                    data.map((i) => (
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
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => navigate("/partidos")}
                                        >
                                            Unirse
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No hay partidos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default MatchesAvailable;