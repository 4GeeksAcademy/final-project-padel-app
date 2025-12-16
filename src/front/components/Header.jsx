import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
    <header className="header d-flex align-items-center px-4 py-3 border-bottom bg-white">
        
        {/* IZQUIERDA: NOMBRE APP */}
        <div className="me-4">
            <h4 className="app-title m-0">MVPadel</h4>
        </div>

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
            </div>
        </div>

        {/* DERECHA: NOTIFICACIONES + AVATAR */}
        <div className="d-flex align-items-center gap-4">
            <span className="material-icons">notifications_none</span>

            <img
                src="https://i.pravatar.cc/50"
                alt="avatar"
                className="rounded-circle"
                width="40"
                height="40"
            />
        </div>
    </header>
);

<<<<<<< HEAD
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
=======
>>>>>>> feature/dashboardDos
};

export default Header;
