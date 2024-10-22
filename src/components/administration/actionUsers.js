import React from 'react'
import { useSelector } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData';

const ActionUsers = ({user}) => {
const {auth} = useSelector(state=>state)
    const handleUserAction = async (action, user) => {
        try {
          let res;
          switch (action) {
            case 'ver':
              console.log(`Ver detalles de ${user.username}`);
              break;
            case 'editar':
              console.log(`Editar usuario ${user.username}`);
              break;
            case 'eliminar':
              console.log(`Eliminar usuario ${user.username}`);
              break;
            case 'bloquear':
              res = await getDataAPI(`users/block/${user._id}`, auth.token);
              alert(res.msg);
              break;
            case 'desbloquear':
              res = await getDataAPI(`users/unblock/${user._id}`, auth.token);
              alert(res.msg);
              break;
            default:
              break;
          }
        } catch (error) {
          console.error(error);
          alert('Error en la acción del usuario');
        }
      };


  return (
    <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      id={`dropdownMenuButton${user._id}`}
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      Acciones
    </button>
    <div className="dropdown-menu dropdown-menu-right" aria-labelledby={`dropdownMenuButton${user._id}`}>
      <button className="dropdown-item" onClick={() => handleUserAction('ver', user)}>
        Ver detalles
      </button>
      <button className="dropdown-item" onClick={() => handleUserAction('editar', user)}>
        Editar usuario
      </button>
      <button className="dropdown-item" onClick={() => handleUserAction('eliminar', user)}>
        Eliminar usuario
      </button>
      <button className="dropdown-item" onClick={() => handleUserAction('bloquear', user)}>
        Bloquear usuario
      </button>
      <button className="dropdown-item" onClick={() => handleUserAction('desbloquear', user)}>
        Desbloquear usuario
      </button>
    </div>
  </div>
  )
}

export default ActionUsers