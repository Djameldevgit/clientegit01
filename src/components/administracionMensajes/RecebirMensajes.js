import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'

import { MESSAGEADMIN_TYPE } from '../../redux/actions/messagesadminAction'
import MessageCard from '../MessageCard'
import Cardmessage from '../Cardmessage'
//import Marcamodelo from '../searching/Marcamodelo'
//import Wilayacommune from '../searching/Wilayacommune'



const RecebirMensajes = () => {
  const { messagesadminReducer, theme } = useSelector((state) => state);


  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`/mensajes?limit=${messagesadminReducer.page * 9}`);

    dispatch({
      type: MESSAGEADMIN_TYPE.GET_MESSAGES,
      payload: { ...res.data, page: messagesadminReducer.page + 1 }
    });

    setLoad(false);
  };


  return (
    <div >
<div >
        {
          messagesadminReducer.mensajes.map(mensaje => (
            <MessageCard key={mensaje._id} mensaje={mensaje}  />
          ))
        }

        {
          load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        }

      </div>
      <LoadMoreBtn result={messagesadminReducer.result} page={messagesadminReducer.page}
        load={load} handleLoadMore={handleLoadMore} />
    </div >
  );
};



export default RecebirMensajes