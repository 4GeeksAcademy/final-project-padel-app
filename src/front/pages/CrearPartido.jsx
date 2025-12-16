import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { createMatches } from "../service/Match";
import { getListCours } from "../service/Courts";

export default function CrearPartido() {
    const { user } = useOutletContext();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [courts, setCourts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        dia: "",
        hora: "",
        tipo: "",
        court_id: state?.id || ""
    });

    useEffect(() => {
        if (!state?.id) {
            loadCourts();
        }
    }, [state]);

    const loadCourts = async () => {
        try {
            const data = await getListCours();
            setCourts(data || []);
        } catch (error) {
            console.error("Error cargando canchas:", error);
            alert("Error al cargar las canchas");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const createMatch = async (e) => {
        e.preventDefault();

        if (!values.court_id) {
            alert("Por favor selecciona una cancha");
            return;
        }

        if (!values.dia || !values.hora || !values.tipo) {
            alert("Por favor completa todos los campos");
            return;
        }

        setLoading(true);

        try {
            const body = {
                day: values.dia,
                time: `${values.dia}T${values.hora}:00`, // ⭐ Formato correcto
                type: values.tipo,
                court_id: parseInt(values.court_id),
                organized_id: user.id
            };

            const result = await createMatches(body);
            
            if (result?.id) {
                alert("¡Partido creado exitosamente!");
                navigate('/dashboard');
            } else {
                alert("Error al crear el partido");
            }
        } catch (error) {
            console.error("Error creando partido:", error);
            alert("Error al crear el partido: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const selectedCourt = courts.find(c => c.id == values.court_id);
    const courtName = state?.name || selectedCourt?.name || "Partido";

    return (
        <div className="container py-4">
            <h2>Crear partido en cancha: {courtName}</h2>

            <form className="mt-3" onSubmit={createMatch}>
                {!state?.id && (
                    <div className="mb-3">
                        <label className="form-label">Cancha</label>
                        <select
                            className="form-control"
                            name="court_id"
                            value={values.court_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una cancha</option>
                            {courts.map(court => (
                                <option key={court.id} value={court.id}>
                                    {court.name} - {court.city}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Día</label>
                    <input
                        className="form-control"
                        type="date"
                        name="dia"
                        value={values.dia}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Hora</label>
                    <input
                        className="form-control"
                        type="time"
                        name="hora"
                        value={values.hora}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Cantidad de jugadores</label>
                    <select
                        className="form-control"
                        name="tipo"
                        value={values.tipo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                    </select>
                </div>

                <button 
                    className="btn btn-primary mt-4" 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creando..." : "Crear Partido"}
                </button>
            </form>
        </div>
    );
}
