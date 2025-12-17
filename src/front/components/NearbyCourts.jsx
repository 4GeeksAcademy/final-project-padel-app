import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDistanceInKm } from "../utils/functions";

// const NearbyCourts = ({ data, idUser, filters }) => {
    const NearbyCourts = ({ data, idUser}) => {
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [coursDintance, setCoursDintance] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                }
            );
        }
    };

    useEffect(() => {
        if (!userLocation || data.length === 0) return;

        const pistaCercana = data
            .map((course) => {
                const distance = getDistanceInKm(
                    userLocation.latitude,
                    userLocation.longitude,
                    course.latitude,
                    course.longitude
                );
                return { ...course, distance };
            })
            .filter((court) => court.distance <= 40000000000000)
            // FILTROS DEL BUSCADOR
            // .filter((court) => {
            //     const matchText =
            //         court.name
            //             .toLowerCase()
            //             .includes(filters.text.toLowerCase()) ||
            //         court.address
            //             .toLowerCase()
            //             .includes(filters.text.toLowerCase());

            //     const matchDistance =
            //         !filters.distance ||
            //         court.distance <= Number(filters.distance);

            //     return matchText && matchDistance;
            // });

        setCoursDintance(pistaCercana);
    // }, [data, userLocation, filters]);
    }, [data, userLocation]);

    return (
        <div className="card p-4 dashboard-card">
            <h5 className="fw-bold mb-3">Canchas Cercanas</h5>

            {coursDintance.length > 0 ? (
                coursDintance.map((court) => (
                    <div
                        key={court.id}
                        className="border rounded p-3 mb-3 d-flex justify-content-between"
                    >
                        <div>
                            <strong>{court.name}</strong>
                            <p className="text-muted m-0">{court.address}</p>

                            <p className="text-muted m-0">
                                {court.distance.toFixed(2)} Km
                            </p>
                        </div>

                        <div className="d-flex flex-column gap-2">
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => setSelectedCourt(court)}
                            >
                                Ver mapa
                            </button>

                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                    navigate("/crear-partido", {
                                        state: {
                                            id: court.id,
                                            name: court.name,
                                            id_user: idUser,
                                        },
                                    })
                                }
                            >
                                Crear partido
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: "center" }}>
                    No hay pistas cercanas
                </p>
            )}
        </div>
    );
};

export default NearbyCourts;