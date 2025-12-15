import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDistanceInKm } from "../utils/functions";

const NearbyCourts = ({ data }) => {
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [coursDintance, setCoursDintance] = useState([]);
    const [coursNearby, setCoursNearby] = useState();
    const navigate = useNavigate();
    console.log(data);

    useEffect(() => {
        getLocation();
    }, [])


    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude })
                },
                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                }
            );
        } else {
            alert("Geolocalización no soportada por tu navegador");
        }
    };

    useEffect(() => {
        if (!userLocation || data.length === 0) return;
        const pistaCercana = data.map((course) => {
            const distance = getDistanceInKm(
                userLocation.latitude,
                userLocation.longitude,
                course.latitude,
                course.longitude
            );
            return {...course,distance};
        }).filter(element=>element.distance <= 2)
        console.log(pistaCercana);
        setCoursDintance(pistaCercana)
    }, [data, userLocation]);

    return (
        <div className="card p-4 dashboard-card">
            <h5 className="fw-bold mb-3">Canchas Cercanas</h5>

            {coursDintance.map((court) => (

                <div
                    key={court.id}
                    className="border rounded p-3 mb-3 d-flex justify-content-between"
                >
                    <div>
                        <strong>{court.name}</strong>
                        <p className="text-muted m-0">{court.address}</p>
                        {/* <p className="text-muted m-0">
                            {court.distance} - {court.price}
                        </p> */}
                        <p className="text-muted m-0">
                            {court.distance.toFixed(2)}Km
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
                            onClick={() => navigate("/crear-partido")}
                        >
                            Crear partido
                        </button>
                    </div>
                </div>
            ))}

            {/* MODAL */}
            {selectedCourt && (
                <div
                    onClick={() => setSelectedCourt(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white p-4 rounded shadow"
                        style={{ width: "90%", maxWidth: "500px" }}
                    >
                        <h5 className="fw-bold">{selectedCourt.name}</h5>

                        <iframe
                            src={selectedCourt.mapUrl}
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>

                        <div className="d-flex justify-content-end mt-3">
                            <button
                                className="btn btn-secondary me-2"
                                onClick={() => setSelectedCourt(null)}
                            >
                                Cerrar
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setSelectedCourt(null);
                                    navigate("/crear-partido");
                                }}
                            >
                                Crear partido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NearbyCourts;
