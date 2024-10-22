 

import React, { useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import {  USER_TYPES } from '../../redux/actions/userAction';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchUsers = () => {
  const { homeUsers, auth } = useSelector(state => state);
 
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState('');

  

  // Manejar la carga de más usuarios
  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`users?limit=${homeUsers.page * 9}`, auth.token);

    dispatch({
      type: USER_TYPES.GET_USERS,
      payload: { ...res.data, page: homeUsers.page + 1 }
    });

    setLoad(false);
  };

  // Manejar acciones del usuario
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

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtrar usuarios según la búsqueda
  const filteredUsers = homeUsers.users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="container mt-4">
      

        <div className="list-users">
          {load && (
            <div className="text-center">
              <img src={LoadIcon} alt="loading" className="img-fluid" />
            </div>
          )}
 
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o email"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn result={homeUsers.result} page={homeUsers.page} load={load} handleLoadMore={handleLoadMore} />
    </div>
  );
};

export default SearchUsers;
