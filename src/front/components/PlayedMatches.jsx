import React from "react";

const PlayedMatches = () => {
    return (
        <div className="card p-3 shadow-sm">
            <h5 className="fw-bold mb-3">Partidos Jugados</h5>

            {[1, 2, 3].map((i) => (
                <div className="border rounded p-3 mb-3 d-flex justify-content-between">
                    <div className="small text-muted">
                        <strong className="text-dark">Jugador X - Organizador</strong>
                        <p className="m-0">Participante 1</p>
                        <p className="m-0">Participante 2</p>
                        <p className="m-0">Participante 3</p>
                        <p className="m-0">Cancha San Pedro / Madrid</p>
                    </div>

                    <img
                        src="https://i.imgur.com/oYiTqum.jpeg"
                        alt="court"
                        className="rounded"
                        width="50"
                    />
                </div>
            ))}
        </div>
    );
};

export default PlayedMatches;