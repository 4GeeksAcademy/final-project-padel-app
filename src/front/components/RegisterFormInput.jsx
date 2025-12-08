export const RegisterFormInput = ({ value, handleChange, label, name, placeholder, idInput, type }) => (

    <div className="mb-2">
        <label for={idInput} className="form-label">{label}</label>
        <input
            type={type}
            className="form-control"
            id={idInput}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange} />
    </div>
);