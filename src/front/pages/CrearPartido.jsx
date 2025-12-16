import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { createMatches } from "../service/Match";
import { useNavigate } from "react-router-dom";

export default function CrearPartido() {
    const [values, setValues] = useState({
        dia: "", 
        hora: "", 
        // nivel: "", 
        // estado: "",
        tipo: ""
    })
    // const { id } = useParams();
    // console.log(id);
    const { state } = useLocation();
    const navigate= useNavigate()


    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values, [name]: value,
        })
    }

    const createMatch = async (e) => {
        e.preventDefault();
        const body = {
            day:values.dia,
            time:`${values.dia}T${values.hora}:00`,
            type:values.tipo,
            court_id:state.id,
            organized_id:state.id_user
        }
        try {
        const result = await createMatches(body);
                console.log(result);
                setValues({dia:"",
                hora:"",
                tipo:""})
                navigate('/dashboard')
        } catch (error) {
        
        }
        
    }

    return (
        <div className="container py-4">
            <h2>Crear partido en cancha {state.name}</h2>

            <form className="mt-3" action="" onSubmit={createMatch}>
                <label className="form-label">Día</label>
                <input className="form-control" type="date" id="dia" name="dia" value={values.dia} onChange={handleChange} />

                <label className="form-label mt-3">Hora</label>
                <input className="form-control" type="time" id="hora" name="hora" value={values.hora} onChange={handleChange} />

                {/* <label className="form-label mt-3">Nivel</label>
                <select className="form-control">
                    <option>Amateur</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                </select> */}

                <label className="form-label mt-3">Cantidad de jugadore</label>
                <select id="tipo" value={values.genero} className="form-control" onChange={handleChange} name="tipo">
                    <option value="">Seleccione una opción</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                </select>

                <button className="btn btn-primary mt-4" type="submit">Crear Partido</button>
            </form>
        </div>
    );
}
