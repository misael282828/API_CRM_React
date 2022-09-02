import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "Yup";

import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  // redirecciona el cliente
  const navigate = useNavigate();

  const nuevoClienteShema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El Nombre es muy Corto")
      .max(20, "El Nombre es muy Largo")
      .required("El Nombre del Cliente es Obligatorio"),

    empresa: Yup.string().required("El Nombre de la Empresa es Obligatorio"),

    email: Yup.string()
      .email("Email no Valido")
      .required("El Email es Obligatorio"),

    telefono: Yup.number()
      .positive("El Numero no es Valido")
      .integer("El Numero no es Valido")
      .typeError("El Numero no es Valido"),
  });

  // agrega los datos del formulario a la db.json
  const handleSubmit = async (valores) => {


    try {
      let respuesta
      if (cliente.id) {
        //Editando un registro 

        const url =  `http://localhost:4000/Clientes/${cliente.id}`
         respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
        
      } else {

          //Nuevo registro 
        const url = "http://localhost:4000/Clientes";
        respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(valores),
        headers: {
          "Content-Type": "application/json",
        },
      });

      
    }
    
  
    respuesta = await respuesta.json();
  
  
    // redirecciona el cliente
    navigate("/clientes");


    } catch (error) {
      console.log(error);
    }



  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1
        className="text-gray-600 font-bold text-xl 
            uppercase text-center"
      >
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        initialValues={{
          // nombre: cliente.nombre ? cliente.nombre : ''
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        // resetForm resetea el formulario
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);

          resetForm();
        }}
        validationSchema={nuevoClienteShema}
      >
        {/* touched valida cuando el usuario sale del input  */}
        {({ errors, touched }) => {
          // console.log(touched);
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-900 font-bold " htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 lock w-full p-3 bg-blue-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-900 font-bold " htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 lock w-full p-3 bg-blue-50"
                  placeholder="Empresa del cliente "
                  name="empresa"
                />

                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-900 font-bold " htmlFor="email">
                  E-mail:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 lock w-full p-3 bg-blue-50"
                  placeholder="Cliente Email "
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-900 font-bold " htmlFor="telefono">
                  Telefono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 lock w-full p-3 bg-blue-50"
                  placeholder="Telefono del Cliente "
                  name="telefono"
                />

                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-900 font-bold " htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 lock w-full p-3 bg-blue-50 h-40"
                  placeholder="Notas del Cliente "
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false 
};

// cargando false para que no se
// muestre en el formulario de agregar nuevo cliente 
export default Formulario;
