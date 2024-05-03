
import RecebirMensajes from '../../../components/administracionMensajes/RecebirMensajes'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Mensajess from './mensajess';

let scroll = 0;
const Recibirmensajes = () => {

  const { messagesadminReducer } = useSelector((state) => state);
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
      <Mensajess />
      <div >
        {messagesadminReducer.result === 0 && (!messagesadminReducer.mensajes?.length || messagesadminReducer.mensajes.length === 0) ? (
          <h2 className="text-center">Aucun message </h2>
        ) : (
          <RecebirMensajes />
        )}
      </div>
    </div>
  )
}

export default Recibirmensajes
