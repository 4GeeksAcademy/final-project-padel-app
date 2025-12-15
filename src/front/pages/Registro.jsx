import { useNavigate } from "react-router-dom";
import { RegisterFormInput } from "../components/RegisterFormInput";
import { useState } from "react";
import "../styles/registro.css";

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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!values.firstname.trim()) newErrors.firstname = "El nombre es obligatorio";
    if (!values.lastname.trim()) newErrors.lastname = "El apellido es obligatorio";
    if (!values.email.trim()) newErrors.email = "El correo es obligatorio";
    if (!values.genero) newErrors.genero = "Seleccione un género";

    if (!values.edad) newErrors.edad = "La edad es obligatoria";
    else if (values.edad < 18) newErrors.edad = "Debes ser mayor de 18 años";

    if (!values.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (values.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    } else if (!/[A-Z]/.test(values.password)) {
      newErrors.password = "Debe tener una mayúscula";
    } else if (!/[a-z]/.test(values.password)) {
      newErrors.password = "Debe tener una minúscula";
    } else if (!/[0-9]/.test(values.password)) {
      newErrors.password = "Debe tener un número";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
      newErrors.password = "Debe tener un carácter especial";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registrarse = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        alert("Registro exitoso. ¡Inicia sesión!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.msg || "Error al registrarse");
      }
    } catch {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="container-fluid">
      <div className="px-5">
        <h2>Crear tu cuenta</h2>

        <form onSubmit={registrarse}>

          <label>Nombre <span className="required">*</span></label>
          <RegisterFormInput name="firstname" value={values.firstname} handleChange={handleChange} />
          {errors.firstname && <small className="error">{errors.firstname}</small>}

          <label>Apellido <span className="required">*</span></label>
          <RegisterFormInput name="lastname" value={values.lastname} handleChange={handleChange} />
          {errors.lastname && <small className="error">{errors.lastname}</small>}

          <label>Nombre de usuario</label>
          <RegisterFormInput name="username" value={values.username} handleChange={handleChange} />

          <div className="row-fields">
            <div className="field">
              <label>Edad <span className="required">*</span></label>
              <RegisterFormInput
                type="number"
                name="edad"
                value={values.edad}
                handleChange={handleChange}
              />
              {errors.edad && <small className="error">{errors.edad}</small>}
            </div>

            <div className="field">
              <label>Género <span className="required">*</span></label>
              <select name="genero" value={values.genero} onChange={handleChange}>
                <option value="">Seleccione</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
              </select>
              {errors.genero && <small className="error">{errors.genero}</small>}
            </div>
          </div>

          <label>Correo electrónico <span className="required">*</span></label>
          <RegisterFormInput type="email" name="email" value={values.email} handleChange={handleChange} />
          {errors.email && <small className="error">{errors.email}</small>}

          <label>Contraseña <span className="required">*</span></label>
          <RegisterFormInput type="password" name="password" value={values.password} handleChange={handleChange} />
          {errors.password && <small className="error">{errors.password}</small>}

          <button type="submit">Registrarse</button>
        </form>

        <div className="auth-footer">
          ¿Ya estás registrado?
          <span onClick={() => navigate("/login")}>Inicia sesión</span>
        </div>
      </div>
    </div>
  );
};
