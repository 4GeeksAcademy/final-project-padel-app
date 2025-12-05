import React from "react";

const MapCard = () => {
    return (
        <div className="card p-3 shadow-sm mb-4">
            <h5 className="fw-bold mb-3">Mapa</h5>

            <img
                src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                alt="map"
                className="img-fluid rounded"
            />

            <button className="btn btn-light border mt-2 w-100">Ver ruta</button>
        </div>
    );
};

export default MapCard;