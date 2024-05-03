import React, { useEffect } from 'react';


import LoadIcon from '../images/loading.gif';

import { useSelector } from 'react-redux';

import Servicios from '../components/homeServicio/Servicios';

let scroll = 0;

const Cervicios = () => {
  const { auth, homeServiciosReducer } = useSelector((state) => state);


  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset
      return scroll;
    }
  })

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' })
    }, 100)
  }, [])











  return (
    <div>























      <div className='home' >
        {homeServiciosReducer.result === 0 && (!homeServiciosReducer.servicios?.length || homeServiciosReducer.servicios.length === 0) ? (
          <h2 className="text-center">Aucun résultat trouvé pour cette recherche</h2>
        ) : (
          <Servicios />
        )}

      </div>








    </div>


  )
}

export default Cervicios
