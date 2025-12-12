import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NearbyCourts = () => {
    const navigate = useNavigate();

    const courts = [
        {
            id: 1,
            name: "Club Deportivo Norte",
            address: "Av. Libertad 1232",
            distance: "2.3 km",
            price: "45€ Hora",
            mapUrl:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.900000123!2d-3.703790!3d40.416775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997df!2sMadrid!5e0!3m2!1ses!2es!4v1234567890",
        },
        {
            id: 2,
            name: "Padel Center Sur",
            address: "Calle Fútbol 22",
            distance: "1.1 km",
            price: "40€ Hora",
            mapUrl:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.900000122!2d-3.703190!3d40.416375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997df!2sMadrid!5e0!3m2!1es!2es!4v1234567891",
        },
        {
            id: 3,
            name: "Centro Padel Este",
            address: "Calle Tenis 19",
            distance: "3.0 km",
            price: "42€ Hora",
            mapUrl:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.900000121!2d-3.703990!3d40.416975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997df!2sMadrid!5e0!3m2!1es!2es!4v1234567892",
        },
    ];

    const [selectedCourt, setSelectedCourt] = useState(null);

    return (
        <div className="card p-4 dashboard-card">
            <h5 className="fw-bold mb-3">Canchas Cercanas</h5>

            {courts.map((court) => (
                <div
                    key={court.id}
                    className="border rounded p-3 mb-3 d-flex justify-content-between"
                >
                    <div>
                        <strong>{court.name}</strong>
                        <p className="text-muted m-0">{court.address}</p>
                        <p className="text-muted m-0">
                            {court.distance} - {court.price}
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
