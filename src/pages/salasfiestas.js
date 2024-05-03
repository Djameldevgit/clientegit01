
import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import Posts from '../components/homePost/Posts';
 
let scroll = 0;
const Salasfiestas = () => {
  const { auth,  homePostsReducer } = useSelector((state) => state);
  const isAuthenticated = !!auth.token;
  const dispatch = useDispatch();

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
   
     


          <div >

          <div className='home'>
                                {homePostsReducer.result === 0 && (!homePostsReducer.posts?.length || homePostsReducer.posts.length === 0) ? (
                                    <h2 className="text-center">Aucun résultat trouvé pour cette recherche</h2>
                                ) : (
                                    <Posts />
                                )}
                            </div>



          </div>






  
 
  )
}

export default Salasfiestas
