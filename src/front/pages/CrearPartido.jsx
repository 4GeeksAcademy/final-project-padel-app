import React from "react";
import { useParams } from "react-router-dom";

export default function CrearPartido() {
    const { id } = useParams();

    return (
        <div className="container py-4">
            <h2>Crear partido en cancha #{id}</h2>

            <form className="mt-3">
                <label className="form-label">Día</label>
                <input className="form-control" type="date" />

                <label className="form-label mt-3">Hora</label>
                <input className="form-control" type="time" />

                <label className="form-label mt-3">Nivel</label>
                <select className="form-control">
                    <option>Amateur</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                </select>

                <button className="btn btn-primary mt-4">Crear Partido</button>
            </form>
        </div>
    );
}
