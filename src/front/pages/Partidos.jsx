import React from "react";

export const Partidos = () => {
    return (
        <div className="container mt-4">
            <h1>Partidos Disponibles</h1>
            <p>Aquí podrás ver la lista de partidos y escribir comentarios, unirte, etc.</p>

            <textarea
                className="form-control mt-3"
                rows="5"
                placeholder="Escribe aquí para unirte o pedir información..."
            ></textarea>

            <button className="btn btn-primary mt-3">Enviar</button>
        </div>
    );
};

export default Partidos;
