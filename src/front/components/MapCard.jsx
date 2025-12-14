import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { getListCours } from "../service/Courts.js";

const MapCard = () => {
    const [cours, setCours] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const mapRef = useRef(null);
    useEffect(() => {
        getLocation();
        getCours();
    }, [])
    const getCours = async () => {
        const result = await getListCours();
        setCours(result);
        console.log(result);


    }
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude })
                    //const map = L.map("map").setView([latitude, longitude], 15);
                    // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    // }).addTo(map);
                    mapRef.current = L.map("map").setView([latitude, longitude], 15);
                    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
                        mapRef.current
                    );

                    // L.marker([latitude, longitude]).addTo(map).bindPopup("Estás aquí").openPopup();
                    // L.marker([38.8670038070093, -6.975657012552478]).addTo(map)
                    L.marker([latitude, longitude]).addTo(mapRef.current).bindPopup("Estás aquí").openPopup();

                },

                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                }
            );
        } else {
            alert("Geolocalización no soportada por tu navegador");
        }
    };


    const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio de la Tierra en km
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



    // useEffect(() => {
    //     if (!mapRef.current) return;
    //     cours.forEach((c) => {
    //         L.marker([c.latitude, c.longitude])
    //             .addTo(mapRef.current)
    //             .bindPopup(c.name);
    //     });
    // }, [cours]);

    useEffect(() => {
        if (!mapRef.current || !userLocation || cours.length === 0) return;


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
                    .bindPopup(
                        `${course.name}<br/>${distance.toFixed(2)} km`
                    );
            }
        });
    }, [cours, userLocation]);


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