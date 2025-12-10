import React from "react";

const NearbyCourts = () => {
    return (
        <div className="card p-4 dashboard-card">

            <h5 className="fw-bold mb-3">Canchas Cercanas</h5>

            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="border rounded p-3 mb-3 d-flex justify-content-between"
                >
                    <div>
                        <strong>Club Deportivo Norte</strong>
                        <p className="text-muted m-0">Av. Libertad 1232</p>
                        <p className="text-muted m-0">2.3 km - 45€ Hora</p>
                    </div>

                    <div className="d-flex flex-column gap-2">
                        <button className="btn btn-outline-primary btn-sm">Ver mapa</button>
                        <button className="btn btn-primary btn-sm">Crear partido</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NearbyCourts;
