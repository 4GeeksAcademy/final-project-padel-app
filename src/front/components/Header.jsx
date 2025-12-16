import React from "react";

const Header = ({ filters, setFilters }) => {
    return (
        <header className="header d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-white">
            <div className="input-group" style={{ maxWidth: "350px" }}>
                <span className="input-group-text">
                    <span className="material-icons">search</span>
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar canchas o partidos"
                    value={filters.text}
                    onChange={(e) =>
                        setFilters({ ...filters, text: e.target.value })
                    }
                />
            </div>

            <div className="d-flex align-items-center gap-3">
                <input
                    type="date"
                    className="form-control"
                    style={{ maxWidth: "150px" }}
                    value={filters.date}
                    onChange={(e) =>
                        setFilters({ ...filters, date: e.target.value })
                    }
                />

                <input
                    type="number"
                    className="form-control"
                    placeholder="Km"
                    style={{ maxWidth: "100px" }}
                    value={filters.distance}
                    onChange={(e) =>
                        setFilters({ ...filters, distance: e.target.value })
                    }
                />

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
