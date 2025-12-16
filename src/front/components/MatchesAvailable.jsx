import React from "react";
import { useNavigate } from "react-router-dom";

const MatchesAvailable = ({ matches = [],data }) => {
    const navigate = useNavigate();
    console.log(data);
    console.log(data.cancha);
    // console.log(data.cancha.id);
    
    return (
        <div className="card p-4 mb-4 dashboard-card">

            <h5 className="fw-bold mb-3">Partidos Disponibles</h5>

            <div className="row g-3">
                {data.map((i) => (
                    <div className="col-md-6" key={i.id}>
                        <div className="border rounded p-3">
                            <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <strong>Hoy - 18:00</strong>
                                    <p className="text-muted m-0">{i.cancha.nombre}</p>
                                </div>

                                <span className="badge bg-info text-dark">Amateur</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-muted">Jugadores: 2/4</span>
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => navigate("/partidos")}
                                >
                                    Unirse
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchesAvailable;