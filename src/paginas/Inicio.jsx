import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // obteniendo los mostrando los resultado del formulario
    const obtenerClientes = async () => {
      try {
        const url = "http://localhost:4000/Clientes/";

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerClientes();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("Desea eliminar este Cliente");
    console.log(confirmar);

    if (confirmar) {
      try {
        const url = `http://localhost:4000/Clientes/${id}`;

        const respuesta = await fetch(url, {
          method: "DELETE",
        });

        await respuesta.json();

        // con el filter traemos los id que sean diferente al que estamos borrando
        // de esta manera se borra del dom sin necesidad de recargar la app

        const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(arrayClientes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 "> Cliente</h1>
      <p className="mt-3 ">Administra tus cliente</p>

      <table className=" w-full mt-5 table-auto shodow bg-white">
        <thead className="bg-blue-800 text-white ">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Inicio;
