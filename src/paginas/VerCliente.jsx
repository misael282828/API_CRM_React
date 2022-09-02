import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  //useParams para poder ver el parametro que estamos enviado
  const { id } = useParams();

  useEffect(() => {
    // setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }

        setTimeout(() => {
          
          setCargando(!cargando);
        }, 1000);

    };
    obtenerClienteAPI();
  }, []);

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p className="font-black text-4xl text-blue-900 "> No Hay Resultados </p>
  ) : (
    <div>
      {cargando ? (
        "cargando..."
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900 ">
            {" "}
            Ver Cliente: {cliente.nombre}
          </h1>
          <p className="mt-3 font-bold  ">informacion del cliente </p>

          {cliente.nombre && (
            <p className="text-4xl text-gray-700 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Cliente:{" "}
              </span>
              {cliente.nombre}
            </p>
          )}

          {cliente.empresa && (
            <p className="text-4xl text-gray-700 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                empresa:{" "}
              </span>
              {cliente.empresa}
            </p>
          )}

          {cliente.email && (
            <p className="text-4xl text-gray-700 mt-4">
              <span className="text-gray-800 uppercase font-bold">email: </span>
              {cliente.email}
            </p>
          )}

          {cliente.telefono && (
            <p className="text-4xl text-gray-700 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                telefono:{" "}
              </span>
              {cliente.telefono}
            </p>
          )}

          {/* el elemento se mostrar solo si tiene informacion  */}
          {cliente.notas && (
            <p className="text-4xl text-gray-700 mt-4">
              <span className="text-gray-800 uppercase font-bold">notas: </span>
              {cliente.notas}
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default VerCliente;
