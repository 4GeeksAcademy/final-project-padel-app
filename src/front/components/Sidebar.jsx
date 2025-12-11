import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";



const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <NavLink to="/dashboard" className="sidebar-item">
                <i className="fa-solid fa-house sidebar-icon"></i>
                <span>Inicio</span>
            </NavLink>

            <NavLink to="/partidos" className="sidebar-item">
                <i className="fa-solid fa-calendar-days sidebar-icon"></i>
                <span>Partidos</span>
            </NavLink>

            <NavLink to="/cancha/1" className="sidebar-item">
                <i className="fa-solid fa-border-all sidebar-icon"></i>
                <span>Canchas</span>
            </NavLink>

            <NavLink to="/jugadores" className="sidebar-item">
                <i className="fa-solid fa-users sidebar-icon"></i>
                <span>Jugadores</span>
            </NavLink>

            <NavLink to="/rankings" className="sidebar-item">
                <i className="fa-solid fa-trophy sidebar-icon"></i>
                <span>Rankings</span>
            </NavLink>

            <NavLink to="/ajustes" className="sidebar-item">
                <i className="fa-solid fa-gear sidebar-icon"></i>
                <span>Ajustes</span>
            </NavLink>
        </div>
    );
};

export default Sidebar;
