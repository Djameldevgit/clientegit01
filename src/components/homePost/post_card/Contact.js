import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { MESS_TYPES } from '../../../redux/actions/messageAction'
 
const Contact = () => {
 
  const { auth } = useSelector(state => state)
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch()
 const history = useHistory()
 
  const { id } = useParams()
    const handleAddUser = (user) => {//Cuando seleccionas un usuario para chatear, la aplicación cambia la URL a algo como /conversacion/usuario123.
 
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}})
       
        return history.push(`/message/${user._id}`)
    }


  return (
    <div>
      <button  className='btn'  onClick={() => handleAddUser(user)} />contacto
    </div>
  )
}

export default Contact
