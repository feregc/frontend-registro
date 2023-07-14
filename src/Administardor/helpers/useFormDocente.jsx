import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useFormDocente = (initialForm = {}, onValidation) => {
  const [formState, setFormState] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //handleChange
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
      // centro: selectedOption
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = onValidation(formState);
    if (err === null) {
      setErrors({});
      axios
        .post("http://localhost:8081/crear/docente", formState)
        .then((res) => {
          console.log({ "Usuario agregado": res.config.data });
          alert("Registrado con exito");
          navigate("/administrador/home");
        })
        .catch((err) => {
          alert("Registrado Fallido");
          console.log(err);
        });
    } else {
      setErrors(err);
    }
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    errors,
    loading,
    handleChange,
    handleSubmit,
    onResetForm,
  };
};

// const handleSubmit = (event) => {
//   event.preventDefault();
//   setError(validacionRegisto(values));
//   const { nombres, apellidos, identidad, email, password, foto, centro } =
//     values;

//   if (error.email === "" || error.email === undefined) {
//     if (error.password === "" || error.password === undefined) {
//       axios
//         .post("http://localhost:8081/crear/docente", {
//           nombres,
//           apellidos,
//           identidad,
//           email,
//           password,
//           foto,
//           centro,
//         })
//         .then((res) => {
//           console.log({ "Usuario agregado": res.config.data });
//           alert("Registrado con exito");
//           navigate("/administrador/home");
//         })
//         .catch((err) => {
//           alert("Registrado Fallido");
//           console.log(err);
//         });
//     }
//   }
// };
