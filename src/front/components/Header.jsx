import React from "react";

const Header = () => {
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

};

export default Header;
