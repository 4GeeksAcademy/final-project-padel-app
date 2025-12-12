import React from "react";
import { useParams } from "react-router-dom";

export default function Cancha() {
    const { id } = useParams();

    return (
        <div className="container py-4">
            <h2>Mapa de la Cancha #{id}</h2>

            <div style={{ width: "100%", height: "300px", background: "#ddd" }}>
                Aquí irá el mapa real.
            </div>
        </div>
    );
}
