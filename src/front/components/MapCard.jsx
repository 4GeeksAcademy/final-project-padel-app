import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const MapCard = () => {

    useEffect(() => {
        getLocation();
    }, [])

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const map = L.map("map").setView([latitude, longitude], 15);
                    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }).addTo(map);

                    L.marker([latitude, longitude]).addTo(map).bindPopup("Estás aquí").openPopup();
                },

                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                }
            );
        } else {
            alert("Geolocalización no soportada por tu navegador");
        }
    };

    return (
        <div className="card p-3 shadow-sm mb-4">
            <h5 className="fw-bold mb-3">Mapa</h5>
            <div id="map" style={{ height: "400px", width: "100%" }}>

            </div>

            <button className="btn btn-light border mt-2 w-100">Ver ruta</button>
        </div>
    );
};

export default MapCard;