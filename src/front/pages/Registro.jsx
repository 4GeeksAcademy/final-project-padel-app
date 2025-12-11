import { useNavigate } from "react-router-dom";
import fondoRegistro from "../assets/img/imagen2.jpg"
import { RegisterFormInput } from "../components/RegisterFormInput";
import { useState, useEffect } from "react";

export const Registro = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        genero: "",
        email: "",
        contraseña: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values, [name]: value,
        })
    }

    const registrarse = (e) => {
        e.preventDefault();
        console.log(values);
        // Navigate to Login after registration
        navigate("/login");
    }


    return (
        <div className="container-fluid d-flex mx-0 px-0">

            <div className="image-container">
                <img src={fondoRegistro} alt="..." />
            </div>
            <div className="px-5" style={{ width: "100%" }}>
                <h2 style={{ textAlign: "center" }}>Crear tu cuenta</h2>
                <form action="" onSubmit={registrarse}>
                    <RegisterFormInput
                        // label="Nombre"
                        type="text"
                        idInput="exampleFormControlInput1"
                        name="nombre"
                        placeholder="Ingrese nombre"
                        value={values.nombre}
                        handleChange={handleChange}
                    />
                    <RegisterFormInput
                        // label="Nombre"
                        type="text"
                        idInput="exampleFormControlInput2"
                        name="apellido"
                        placeholder="Ingrese apellido"
                        value={values.apellido}
                        handleChange={handleChange}
                    />
                    <RegisterFormInput
                        // label="Nombre"
                        type="number"
                        idInput="exampleFormControlInput3"
                        name="edad"
                        placeholder="Ingrese edad"
                        value={values.edad}
                        handleChange={handleChange}
                    />
                    {/* <RegisterFormInput
                        // label="Nombre"
                        type="text"
                        idInput="exampleFormControlInput4"
                        name="genero"
                        placeholder="Ingrese genero"
                        value={values.genero}
                        handleChange={handleChange}
                    /> */}
                    <select id="genero" value={values.genero} onChange={handleChange} name="genero">
                        <option value="">Seleccione una opción</option>
                        <option value="femenino">Femenino</option>
                        <option value="masculino">Maculino</option>
                    </select>
                    <RegisterFormInput
                        // label="Email"
                        type="text"
                        idInput="exampleFormControlInput5"
                        name="email"
                        placeholder="Ingrese correo"
                        value={values.email}
                        handleChange={handleChange}
                    />
                    <RegisterFormInput
                        // label="Contraseña"
                        type="password"
                        idInput="exampleFormControlInput5"
                        name="contraseña"
                        placeholder="Ingrese contraseña"
                        value={values.contraseña}
                        handleChange={handleChange}
                    />
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit" >Registrarse</button>
                    </div>
                </form>

            </div>
        </div>
    );
}
//export default Registro;
