import { useNavigate } from "react-router-dom";
import fondoRegistro from "../assets/img/imagen2.jpg"
import { RegisterFormInput } from "../components/RegisterFormInput";
import { useState } from "react";

// const API_URL = "https://scaling-journey-jjgpvrvqg59rcjgg7-3001.app.github.dev";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const Registro = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        firstname: "", 
        lastname: "", 
        username: "", 
        edad: "",
        genero: "",
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values, [name]: value,
        })
    }

    const registrarse = async (e) => {
        e.preventDefault();

        
        const dataToSend = {
            firstname: values.firstname,
            lastname: values.lastname,
            username: values.username || values.email, 
            age: values.edad,
            gender: values.genero,
            email: values.email,
            password: values.password
        };

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            // 2. Manejo de la respuesta
            if (response.ok) {
                const result = await response.json();
                console.log("Registro exitoso:", result);
                alert("Registro exitoso. ¡Inicia sesión!");
                // Redirigir al login solo después del éxito
                navigate("/login");
            } else {
                const errorData = await response.json();
                console.error("Error en el registro (API):", errorData);
                alert(`Error al registrarse: ${errorData.msg || 'Credenciales inválidas o usuario ya existe.'}`);
            }

        } catch (error) {
            console.error("Error de red/conexión:", error);
            alert("Error al conectar con el servidor. Verifica la URL de la API.");
        }
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
                        type="text"
                        idInput="exampleFormControlInput1"
                        name="firstname" 
                        placeholder="Ingrese nombre"
                        value={values.firstname}
                        handleChange={handleChange}
                    />
                    <RegisterFormInput
                        type="text"
                        idInput="exampleFormControlInput2"
                        name="lastname" 
                        placeholder="Ingrese apellido"
                        value={values.lastname}
                        handleChange={handleChange}
                    />
                    <RegisterFormInput
                        type="text"
                        idInput="exampleFormControlInput0"
                        name="username" 
                        placeholder="Ingrese nombre de usuario"
                        value={values.username}
                        handleChange={handleChange}
                    />
                    <RegisterFormInput
                        type="number"
                        idInput="exampleFormControlInput3"
                        name="edad"
                        placeholder="Ingrese edad"
                        value={values.edad}
                        handleChange={handleChange}
                    />
                    <select id="genero" value={values.genero} onChange={handleChange} name="genero">
                        <option value="">Seleccione una opción</option>
                        <option value="femenino">Femenino</option>
                        <option value="masculino">Maculino</option>
                    </select>
                    <RegisterFormInput
                        type="text"
                        idInput="exampleFormControlInput5"
                        name="email"
                        placeholder="Ingrese correo"
                        value={values.email}
                        handleChange={handleChange}
                    />
                    <RegisterFormInput
                        type="password"
                        idInput="exampleFormControlInput6"
                        name="password"
                        placeholder="Ingrese contraseña"
                        value={values.password}
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