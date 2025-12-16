import React from "react";

const PlayedMatches = () => {

    const matches = [
        {
            organizador: "Jugador X",
            participantes: ["Pedro", "Juan", "José"],
            cancha: "San Jorge / Madrid",
            imagen: "https://i.imgur.com/oYiTqum.jpeg"
        },
        {
            organizador: "Jugador Y",
            participantes: ["Luis", "Carlos", "Daniel"],
            cancha: "Móstoles / Madrid",
            imagen: "https://i.imgur.com/3GvwNBf.jpeg"
        },
        {
            organizador: "Jugador Z",
            participantes: ["Ana", "María", "Sofía"],
            cancha: "Parque Lisboa / Alcorcón",
            imagen: "https://i.imgur.com/NpKoptG.jpeg"
        }
    ];

    return (
        <div className="card p-3 shadow-sm">
            <h5 className="fw-bold mb-3">Partidos Jugados</h5>

            {matches.map((match, index) => (
                <div
                    key={index}
                    className="border rounded p-3 mb-3 d-flex justify-content-between"
                >
                    <div className="small text-muted">
                        <strong className="text-dark">{match.organizador} - Organizador</strong>

                        {match.participantes.map((p, i) => (
                            <p key={i} className="m-0">{p}</p>
                        ))}

                        <p className="m-0">{match.cancha}</p>
                    </div>

                    <img
                        src={match.imagen}
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
