import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    // Estado de filtros
    const [filters, setFilters] = useState(() => {
        // Cargar de sessionStorage si existe
        const stored = sessionStorage.getItem("dashboardFilters");
        return stored ? JSON.parse(stored) : {
            text: "",
            date: "",
            distance: ""
        };
    });

    // Guardar en sessionStorage cuando cambien los filtros
    useEffect(() => {
        sessionStorage.setItem("dashboardFilters", JSON.stringify(filters));
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className="header d-flex justify-content-between align-items-center px-4 py-3"
            style={{
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
            }}>
            {/* IZQUIERDA: BUSCADOR + FILTROS */}
            <div className="d-flex align-items-center gap-3 flex-grow-1" style={{ maxWidth: "600px" }}>
                <div className="input-group" style={{ maxWidth: "280px" }}>
                    <span className="input-group-text bg-white border-0">
                        <span className="material-icons text-secondary">search</span>
                    </span>
                    <input
                        type="text"
                        className="form-control border-0 shadow-sm"
                        placeholder="Buscar canchas o partidos"
                        name="text"
                        value={filters.text}
                        onChange={handleFilterChange}
                        style={{
                            borderRadius: "0 8px 8px 0",
                            padding: "0.6rem"
                        }}
                    />
                </div>

                <input
                    type="date"
                    className="form-control border-0 shadow-sm"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    style={{
                        maxWidth: "150px",
                        borderRadius: "8px",
                        padding: "0.6rem"
                    }}
                />

                <select
                    className="form-control border-0 shadow-sm"
                    name="distance"
                    value={filters.distance}
                    onChange={handleFilterChange}
                    style={{
                        maxWidth: "130px",
                        borderRadius: "8px",
                        padding: "0.6rem"
                    }}
                >
                    <option value="">Distancia</option>
                    <option value="5">5 km</option>
                    <option value="10">10 km</option>
                    <option value="20">20 km</option>
                </select>
            </div>

            {/* DERECHA: NOTIFICACIONES + AVATAR */}
            <div className="d-flex align-items-center gap-3">
                {/* Campana de notificaciones */}
                <div
                    className="position-relative d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: "#f3f4f6",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e5e7eb"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                >
                    <span className="material-icons" style={{ color: "#6b7280" }}>notifications_none</span>
                </div>

                {/* Avatar con menú */}
                <div className="position-relative">
                    <img
                        src="https://i.pravatar.cc/50"
                        alt="avatar"
                        className="rounded-circle"
                        width="40"
                        height="40"
                        role="button"
                        onClick={() => setShowMenu(!showMenu)}
                        style={{
                            cursor: "pointer",
                            border: "2px solid #e5e7eb",
                            transition: "transform 0.2s ease",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />

                    {showMenu && (
                        <div
                            className="dropdown-menu show position-absolute end-0 mt-2 p-2 shadow-lg border-0"
                            style={{
                                minWidth: "200px",
                                zIndex: 1000,
                                borderRadius: "12px",
                                animation: "fadeIn 0.2s ease"
                            }}
                        >
                            <h6 className="dropdown-header text-uppercase text-muted small fw-bold">
                                Perfil
                            </h6>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 rounded py-2 text-danger"
                                onClick={handleLogout}
                                style={{
                                    transition: "background-color 0.2s ease"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fee"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                                <span className="material-icons" style={{ fontSize: "1.2rem" }}>logout</span>
                                Salir
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );

};

export default Header;
