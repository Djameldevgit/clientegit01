import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
 

import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
 
import ServicioCard from '../ServicioCard';
import { SERVICIOAPROVE_TYPES } from '../../redux/actions/servicioaproveAction';
 
const Serviciospendientess = () => {
  const { servicioaproveReducer, auth } = useSelector((state) => state);
 console.log(servicioaproveReducer.servicios)
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const serviciospedientes = servicioaproveReducer.servicios.filter((p) => p.estado === 'pendiente');
    setServicios(serviciospedientes);
  }, [servicioaproveReducer.servicios]);
  
  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getserviciospendientes?limit=${servicioaproveReducer.page * 9}`, auth.token);

      dispatch({
        type: SERVICIOAPROVE_TYPES.APROVE_SERVICIO_PENDIENTE,
        payload: { ...res.data, page: servicioaproveReducer.page + 1 },
      });
  
      setLoad(false);
    };
  
    return (
      <div className="post_thumb">
      {servicios.map((servicio) => (
        <ServicioCard key={servicio._id} servicio={servicio} />
      ))}
      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn
        result={servicioaproveReducer.result}
        page={servicioaproveReducer.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Serviciospendientess;
 

 