import { useNavigate } from "react-router-dom"



const Cliente = ({cliente, handleEliminar}) => {

  const navigate = useNavigate()
  
  const { nombre, empresa, email, telefono, notas, id  } = cliente
  return (
    <tr className="border-b hover:bg-blue-100">

      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p><span className="text-gray-800 font-bold uppercase">Email:</span>  {email}</p>
        <p><span className="text-gray-800 font-bold uppercase">Tel:</span>  {telefono}</p>
      </td>
      <td className="p-3 ">{empresa}</td>
      <td className="p-3 ">

        
      <button
      type="button"
      className="bg-yellow-500 hover:bg-yellow-600 w-full block text-white font-bold p-2 uppercase text-xs mb-3"
      onClick={ () => navigate(`/clientes/${id}`)}
      >
        Ver
      </button>

      <button
      type="button"
      className="bg-blue-600 hover:bg-blue-700 w-full block text-white font-bold p-2 uppercase text-xs "
      onClick={() => navigate(`/clientes/editar/${id}`)}
      >
        Editar
      </button>

      <button
      type="button"
      className="bg-red-600 hover:bg-red-700 w-full block text-white font-bold p-2 uppercase text-xs mt-3"
      onClick={() => handleEliminar(id)}
      >
        Eliminar
      </button>


      </td>
    </tr>
  )
}
export default Cliente