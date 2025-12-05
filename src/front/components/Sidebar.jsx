import React from "react";

const Sidebar = () => {
    const items = [
        { icon: "bi-house", label: "Inicio", active: true },
        { icon: "bi-collection", label: "Partidos" },
        { icon: "bi-grid", label: "Canchas" },
        { icon: "bi-people", label: "Jugadores" },
        { icon: "bi-trophy", label: "Rankings" },
        { icon: "bi-gear", label: "Ajustes" }
    ];

    return (
        <aside
            className="d-flex flex-column p-4"
            style={{ width: "240px", background: "#f8f9fa", height: "100vh" }}
        >
            {/* Logo */}
            <div className="d-flex align-items-center mb-4">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/889/889442.png"
                    alt="logo"
                    width="28"
                    className="me-2"
                />
                <h4 className="m-0 fw-bold">PadelPro</h4>
            </div>

            {/* Menu */}
            <nav className="mt-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`d-flex align-items-center mb-3 p-2 rounded ${item.active ? "bg-primary text-white" : "text-secondary"
                            }`}
                        style={{ cursor: "pointer" }}
                    >
                        <i className={`${item.icon} me-3 fs-5`} />
                        <span className="fw-semibold">{item.label}</span>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;