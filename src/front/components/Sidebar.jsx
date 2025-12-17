import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
    return (
        <div className="padel-sidebar-wrapper">
            <NavLink to="/dashboard" className="padel-nav-item">
                <i className="fa-solid fa-house padel-nav-icon"></i>
                <span>Inicio</span>
            </NavLink>

            <NavLink to="/partidos" className="padel-nav-item">
                <i className="fa-solid fa-calendar-days padel-nav-icon"></i>
                <span>Partidos</span>
            </NavLink>

            <NavLink to="/cancha/1" className="padel-nav-item">
                <i className="fa-solid fa-border-all padel-nav-icon"></i>
                <span>Canchas</span>
            </NavLink>

            <NavLink to="/jugadores" className="padel-nav-item">
                <i className="fa-solid fa-users padel-nav-icon"></i>
                <span>Jugadores</span>
            </NavLink>

            <NavLink to="/rankings" className="padel-nav-item">
                <i className="fa-solid fa-trophy padel-nav-icon"></i>
                <span>Rankings</span>
            </NavLink>

            <NavLink to="/ajustes" className="padel-nav-item">
                <i className="fa-solid fa-gear padel-nav-icon"></i>
                <span>Ajustes</span>
            </NavLink>
        </div>
    );
};

export default Sidebar;
