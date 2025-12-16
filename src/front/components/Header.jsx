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
        <header className="header d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-white">
            {/* BUSCADOR + FILTROS (reutilizando tu layout) */}
            <div className="d-flex align-items-center gap-3" style={{ maxWidth: "500px" }}>
                <div className="input-group" style={{ maxWidth: "250px" }}>
                    <span className="input-group-text">
                        <span className="material-icons">search</span>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar canchas o partidos"
                        name="text"
                        value={filters.text}
                        onChange={handleFilterChange}
                    />
                </div>

                <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    style={{ maxWidth: "150px" }}
                />

                <select
                    className="form-control"
                    name="distance"
                    value={filters.distance}
                    onChange={handleFilterChange}
                    style={{ maxWidth: "150px" }}
                >
                    <option value="">Distancia</option>
                    <option value="5">5 km</option>
                    <option value="10">10 km</option>
                    <option value="20">20 km</option>
                </select>
            </div>

            {/* PARTE DERECHA: NOTIFICACIONES + AVATAR (igual que antes) */}
            <div className="d-flex align-items-center gap-4">
                <span className="material-icons">notifications_none</span>



                {/* CENTRO: BUSCADOR */}
                <div className="flex-grow-1">
                    <div className="input-group" style={{ maxWidth: "350px" }}>
                        <span className="input-group-text">
                            <span className="material-icons">search</span>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar canchas o partidos"
                        />

                        {showMenu && (
                            <div
                                className="dropdown-menu show position-absolute end-0 mt-2 p-2 shadow border-0"
                                style={{ minWidth: "200px", zIndex: 1000 }}
                            >
                                <h6 className="dropdown-header text-uppercase text-muted small fw-bold">
                                    Perfil
                                </h6>
                                <button
                                    className="dropdown-item d-flex align-items-center gap-2 rounded py-2 text-danger"
                                    onClick={handleLogout}
                                >
                                    <span className="material-icons" style={{ fontSize: "1.2rem" }}>logout</span>
                                    Salir
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="position-relative">
                    <img
                        src="https://i.pravatar.cc/50"
                        alt="avatar"
                        className="rounded-circle cursor-pointer"
                        width="40"
                        height="40"
                        role="button"
                        onClick={() => setShowMenu(!showMenu)}
                        style={{ cursor: "pointer" }}
                    />

                    {showMenu && (
                        <div
                            className="dropdown-menu show position-absolute end-0 mt-2 p-2 shadow border-0"
                            style={{ minWidth: "200px", zIndex: 1000 }}
                        >
                            <h6 className="dropdown-header text-uppercase text-muted small fw-bold">Perfil</h6>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 rounded py-2 text-danger"
                                onClick={handleLogout}
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
