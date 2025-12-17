import React from "react";
import { useNavigate } from "react-router-dom";

// const MatchesAvailable = ({ matches = [], filters }) => {
//     const navigate = useNavigate();

//     const filteredMatches = matches
//         .filter((match) =>
//             match.courtName.toLowerCase().includes(filters.text.toLowerCase())
//         )
//         .filter((match) =>
//             filters.date ? match.date === filters.date : true
//         );

//     return (
//         <div className="card p-4 mb-4 dashboard-card">
//             <h5 className="fw-bold mb-3">Partidos Disponibles</h5>

//             <div className="row g-3">
//                 {filteredMatches.length > 0 ? (
//                     filteredMatches.map((match) => (
//                         <div className="col-md-6" key={match.id}>
//                             <div className="border rounded p-3">
//                                 <strong>{match.date} - {match.time}</strong>
//                                 <p className="text-muted m-0">
//                                     {match.courtName}
//                                 </p>

//                                 <div className="d-flex justify-content-between align-items-center mt-2">
//                                     <span className="text-muted">
//                                         Jugadores: {match.players}/{match.maxPlayers}
//                                     </span>

//                                     <button
//                                         className="btn btn-outline-primary btn-sm"
//                                         onClick={() => navigate("/partidos")}
//                                     >
//                                         Unirse
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center">No hay partidos con esos filtros</p>
//                 )}
//             </div>
//         </div>
//     );
// };

const MatchesAvailable = ({ matches = [], data }) => {
    const navigate = useNavigate();
    console.log(data);
    console.log(data.cancha);
    // console.log(data.cancha.id);

    return (
        <div className="card p-4 mb-4 dashboard-card">
            <h5 className="fw-bold mb-3">Partidos Disponibles</h5>

            <div className="row g-3">
                {data && data.length > 0 ? (
                    data.map((i) => (
                        <div className="col-md-6" key={i.id}>
                            <div className="border rounded p-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <div>
                                        <strong>
                                            {i.day ? new Date(i.day).toLocaleDateString("es-ES") : "Fecha N/A"} -
                                            {i.time?.includes("T") ? i.time.split("T")[1].slice(0, 5) : i.time}
                                        </strong>
                                        {/* Usamos encadenamiento opcional ?. para evitar que la app explote */}
                                        <p className="text-muted m-0">
                                            {i.cancha?.nombre || i.court?.name || "Cancha no definida"}
                                        </p>
                                    </div>
                                    <span className="badge bg-info text-dark">Amateur</span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-muted">Jugadores: 2 / {i.type || 4}</span>
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
                    <p className="text-center">No hay partidos disponibles en este momento.</p>
                )}
            </div>
        </div>
    );
};

export default MatchesAvailable;