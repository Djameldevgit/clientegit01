import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { USERS_TYPES } from '../../redux/actions/users/usersAction';
 
 



const GetUsersPosts = () => {
  const { usersReducer, auth } = useSelector(state => state);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const dispatch = useDispatch();
 
  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`users?limit=${usersReducer.page * 9}`, auth.token);


    dispatch({
      type: USERS_TYPES.GET_USERS,
      payload: { ...res.data, page: usersReducer.page + 1 }
    });
    setLoad(false);
  };
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    // Lógica para enviar solicitud al servidor con fechas de inicio y fin
    // Actualizar el estado de filteredUsers con la respuesta del servidor
  };
  return (

    <div>
      <h2>Administrar Usuarios</h2>
      <form onSubmit={handleFilterSubmit}>
        <label htmlFor="startDate">Fecha de inicio:</label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label htmlFor="endDate">Fecha de fin:</label>
        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button type="submit">Filtrar</button>
      </form>

      <div className="table-responsive">
      <table className="table table-bordered table-striped">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Email</th>
      <th>Fecha de Registro</th>
    </tr>
  </thead>
  <tbody>
    {usersReducer.users.map((user) => (
 
      <tr key={user._id}>
        <td>{user._id}</td> {/* ID del usuario */}
        <td>{user.username}</td> {/* Nombre del usuario */}
        <td>{user.email}</td> {/* Correo electrónico del usuario */}
        </tr>
    ))}
    
  
  </tbody>
</table>

        <div className="mx-auto">
          {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
          <LoadMoreBtn result={usersReducer.result} page={usersReducer.page} load={load} handleLoadMore={handleLoadMore} />
        </div>


      </div>

    </div>
  );
};

export default GetUsersPosts;
