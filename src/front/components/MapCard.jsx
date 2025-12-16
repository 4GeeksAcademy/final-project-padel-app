import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { getListCours } from "../service/Courts.js";

const MapCard = () => {
    const [cours, setCours] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const mapRef = useRef(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });

                    mapRef.current = L.map("map").setView([latitude, longitude], 15);

                    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }).addTo(mapRef.current);

                    L.marker([latitude, longitude])
                        .addTo(mapRef.current)
                        .bindPopup("Estás aquí")
                        .openPopup();
                },
                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                }
            );
        } else {
            alert("Geolocalización no soportada por tu navegador");
        }
    };

    const getCours = async () => {
        const result = await getListCours();
        setCours(result);
    };

    useEffect(() => {
        getLocation();
        getCours();
    }, []);

    const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; 
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    useEffect(() => {
  if (
    !mapRef.current ||
    !userLocation ||
    !Array.isArray(cours) ||
    cours.length === 0
  ) return;

  cours.forEach((course) => {
    const distance = getDistanceInKm(
      userLocation.latitude,
      userLocation.longitude,
      course.latitude,
      course.longitude
    );

    if (distance <= 2) {
      L.marker([course.latitude, course.longitude])
        .addTo(mapRef.current)
        .bindPopup(`${course.name}<br/>${distance.toFixed(2)} km`);
    }
  });
}, [cours, userLocation]);


    const showRoute = () => {
        if (!userLocation || !mapRef.current || !selectedCourse) return;

        if (mapRef.current._routingControl) {
            mapRef.current.removeControl(mapRef.current._routingControl);
        }

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(userLocation.latitude, userLocation.longitude),
                L.latLng(selectedCourse.latitude, selectedCourse.longitude),
            ],
            lineOptions: { styles: [{ color: "blue", weight: 4 }] },
            addWaypoints: false,
            draggableWaypoints: false,
            routeWhileDragging: false,
        }).addTo(mapRef.current);

        mapRef.current._routingControl = routingControl;
    };

    return (
        <div className="card p-3 shadow-sm mb-4">
            <h5 className="fw-bold mb-3">Mapa</h5>
            <div id="map" style={{ height: "400px", width: "100%" }}></div>

            <button
                className="btn btn-light border mt-2 w-100"
                onClick={showRoute}
                disabled={!selectedCourse}
            >
                Ver ruta
            </button>
        </div>
    );
};

export default MapCard;
