import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { SERVICIO_TYPES } from '../../redux/actions/servicioAction'
import ServicioCard from './../ServicioCard';
 


const Servicios = () => {
  const { homeServiciosReducer,   theme } = useSelector((state) => state);



  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`/servicios?limit=${homeServiciosReducer.page * 9}` );

    dispatch({
      type: SERVICIO_TYPES.GET_SERVICIOS,
      payload: { ...res.data, page: homeServiciosReducer.page + 1 }
    });

    setLoad(false);
  };


  return (
    <div >
       


       <div className="post_thumb">
  {
    homeServiciosReducer.servicios && Array.isArray(homeServiciosReducer.servicios) && homeServiciosReducer.servicios.map(servicio => (
      <ServicioCard key={servicio._id} servicio={servicio} theme={theme} />
    ))
  }

  {
    load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
  }

 
</div>
<LoadMoreBtn result={homeServiciosReducer.result} page={homeServiciosReducer.page}
    load={load} handleLoadMore={handleLoadMore} />
    </div >
  );
};

export default Servicios;
 