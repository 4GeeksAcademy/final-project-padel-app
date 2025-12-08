import React, { useEffect, useState } from "react";

const PlayedMatches = () => {

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetch(process.env.BACKEND_URL + "/api/user/matches", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Partidos cargados:", data);
                setMatches(data);
            });
    }, []);

    return (
        <div className="card p-3 mt-4">
            <h4 className="mb-3">Partidos Jugados</h4>

            {matches.length === 0 && <p>No hay partidos registrados.</p>}

            <ul className="list-group">
                {matches.map(match => (
                    <li key={match.id} className="list-group-item">
                        <strong>Resultado:</strong> {match.resultado} <br />
                        <strong>Compañero:</strong> {match.companero} <br />
                        <strong>Rivales:</strong> {match.rivales.join(", ")} <br />
                        <strong>Fecha:</strong> {match.fecha}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayedMatches;
