import React, { useEffect } from 'react'
 

import LoadIcon from '../../images/loading.gif'
import { useSelector  } from 'react-redux';
import Postspendientess from '../../components/homePost/Postspendientess'
let scroll = 0;
const Postspendientes = () => {

  const { postaproveReducer  } = useSelector(state => state)
 

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
  
      
        <div className="home">






          {
            postaproveReducer.loading
              ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
              : (postaproveReducer.posts === 0 && postaproveReducer.posts.length === 0)
                ?    <h2 className="text-center">Aucun résultat trouvé pour cette recherche</h2>
                : <Postspendientess />
          }








        </div>

    
  )
}

export default Postspendientes




