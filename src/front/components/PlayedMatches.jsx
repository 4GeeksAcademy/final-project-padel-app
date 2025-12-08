import React from "react";

const PlayedMatches = ({ matches = [] }) => {
    return (
        <div className="card p-3">
            <h5>Partidos Jugados</h5>

            {matches.length === 0 ? (
                <p>No hay partidos jugados.</p>
            ) : (
                <ul>
                    {matches.map((match, index) => (
                        <li key={index}>
                            {match.day} - {match.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlayedMatches;
