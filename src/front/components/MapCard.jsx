import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { getListCours, fetchNearbyCourts } from "../service/Courts.js";
import { getDistanceInKm } from "../utils/functions";

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapCard = () => {
    const [cours, setCours] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);

    // 1. Initialize Map
    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map").setView([40.416775, -3.703790], 6); // Default to Madrid

            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current);
        }

        // Try getting user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });

                    L.circleMarker([latitude, longitude], {
                        radius: 8,
                        fillColor: "#3388ff",
                        color: "#fff",
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.8
                    }).addTo(mapRef.current).bindPopup("Estás aquí");

                    // Cargar canchas cercanas DESPUÉS de tener ubicación
                    loadCourts();
                },
                (error) => {
                    console.log("Ubicación no disponible/denegada", error);
                    loadCourts(); // Cargar todas si falla geolocation
                }
            );
        }

    }, []);

    // 2. Fetch Courts
    const loadCourts = async () => {
        if (userLocation) {
            // Si tenemos ubicación, buscar cercanas
            const data = await fetchNearbyCourts(
                userLocation.latitude,
                userLocation.longitude,
                5  // 5 km
            );
            setCours(data || []);
        } else {
            // Si no, cargar todas
            const data = await getListCours();
            setCours(data || []);
        }
    };


    // 3. Render Court Markers & Fit Bounds
    useEffect(() => {
        if (!mapRef.current || cours.length === 0) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // const a =
        //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        //     Math.cos((lat1 * Math.PI) / 180) *
        //         Math.cos((lat2 * Math.PI) / 180) *
        //         Math.sin(dLon / 2) *
        //         Math.sin(dLon / 2);

        // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // return R * c;
    });

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

    if (distance <= 40000000000000) {
      L.marker([course.latitude, course.longitude])
        .addTo(mapRef.current)
        .bindPopup(`${course.name}<br/>${distance.toFixed(2)} km`);
    }
  });
}, [cours, userLocation]);


    // 4. Show Route Logic
    const showRoute = () => {
        if (!userLocation || !mapRef.current || !selectedCourse) {
            alert("Necesitamos tu ubicación y una cancha seleccionada para calcular la ruta.");
            return;
        }

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
            createMarker: function () { return null; } // Don't create extra markers for route points
        }).addTo(mapRef.current);

        mapRef.current._routingControl = routingControl;
    };

    return (
        <div className="card p-3 shadow-sm mb-4">
            <h5 className="fw-bold mb-3">Mapa de Canchas</h5>
            <div id="map" style={{ height: "400px", width: "100%", borderRadius: "8px" }}></div>

            <div className="mt-2 text-center">
                {selectedCourse ? (
                    <div className="alert alert-info py-2 mb-2">
                        Seleccionado: <strong>{selectedCourse.name}</strong>
                    </div>
                ) : (
                    <small className="text-muted">Haz clic en un marcador para seleccionar cancha</small>
                )}
            </div>

            <button
                className="btn btn-primary w-100"
                onClick={showRoute}
                disabled={!selectedCourse || !userLocation}
            >
                {userLocation ? "Ver Ruta" : "Ubicación no disponible"}
            </button>
        </div>
    );
};

export default MapCard;
