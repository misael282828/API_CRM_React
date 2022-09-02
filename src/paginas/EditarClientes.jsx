import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Formulario from "../components/Formulario"



const EditarClientes = () => {

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
      
      setCargando(!cargando);
        // setTimeout(() => {
          
        // }, 1050);

    };
    obtenerClienteAPI();
  }, []);


  return (
    <div>
        <h1 className='font-black text-4xl text-blue-900 ' >Editar  Cliente </h1>
      <p className='mt-3 font-bold'>Formulario para editar Clientes</p>


      {cliente.id ? (
         <Formulario 
         cliente={cliente}
         cargando={cargando}
       /> 
      ) : <p>Cliente Id no Valido </p>}
     


    </div>
  )
}
export default EditarClientes