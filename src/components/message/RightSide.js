import React, { useState, useEffect, useRef } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import MsgDisplay from './MsgDisplay'
import Icons from '../Icons'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { imageShow, videoShow } from '../../utils/mediaShow'
import { imageUpload } from '../../utils/imageUpload'
import { addMessage, getMessages, loadMoreMessages, deleteConversation } from '../../redux/actions/messageAction'
import LoadIcon from '../../images/loading.gif'
/*user: Almacena la información del usuario con el que se está chateando actualmente.
text: Almacena el texto del mensaje que el usuario está escribiendo.
media: Almacena los archivos multimedia (imágenes o videos) adjuntos al mensaje.
loadMedia: Indica si se están cargando archivos multimedia.
data: Almacena los mensajes de la conversación actual.
result: Número total de mensajes en la conversación actual.
page: Página actual de mensajes cargados.
isLoadMore: Indica si se están cargando más mensajes al hacer scroll.

handleChangeMedia: Maneja el cambio en los archivos multimedia seleccionados por el usuario.
handleDeleteMedia: Maneja la eliminación de un archivo multimedia de la lista.
handleSubmit: Maneja el envío del mensaje.
handleDeleteConversation: Maneja la eliminación de la conversación actual.
caller: Inicia una llamada de audio o video.
callUser: Llama al usuario actual.
useEffect: Obtiene los mensajes de la conversación actual al cargar el componente.
useEffect (Load More): Detecta cuando el usuario llega al final de la página y carga más mensajes.
useEffect: Controla la eliminación de la conversación al cargar el componente.
*/
const RightSide = () => {
    const { auth, message, theme, socket, peer } = useSelector(state => state)
    const dispatch = useDispatch()

    const { id } = useParams()
    const [user, setUser] = useState([])
    const [text, setText] = useState('')
    const [media, setMedia] = useState([])
    const [loadMedia, setLoadMedia] = useState(false)

    const refDisplay = useRef()
    const pageEnd = useRef()

    const [data, setData] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(0)
    const [isLoadMore, setIsLoadMore] = useState(0)

    const history = useHistory()

    useEffect(() => {
        const newData = message.data.find(item => item._id === id)
        if(newData){
            setData(newData.messages)
            setResult(newData.result)
            setPage(newData.page)
        }
    },[message.data, id])

    useEffect(() => {
        if(id && message.users.length > 0){
            setTimeout(() => {
                refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
            },50)

            const newUser = message.users.find(user => user._id === id)
            if(newUser) setUser(newUser)
        }
    }, [message.users, id])

    const handleChangeMedia = (e) => {
        const files = [...e.target.files]
        let err = ""
        let newMedia = []

        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newMedia.push(file)
        })

        if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
        setMedia([...media, ...newMedia])
    }

    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!text.trim() && media.length === 0) return;
        setText('')
        setMedia([])
        setLoadMedia(true)

        let newArr = [];
        if(media.length > 0) newArr = await imageUpload(media)

        const msg = {
            sender: auth.user._id,
            recipient: id,
            text, 
            media: newArr,
            createdAt: new Date().toISOString()
        }

        setLoadMedia(false)
        await dispatch(addMessage({msg, auth, socket}))
        if(refDisplay.current){//esta parte del código garantiza que la ventana de visualización se desplace automáticamente hacia abajo para mostrar los nuevos mensajes cuando se agregan a la conversación. Esto mejora la experiencia del usuario al mantenerlos actualizados con los últimos mensajes sin que tengan que desplazarse manualmente.
            refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        }
    }

    useEffect(() => {
        const getMessagesData = async () => {
            if(message.data.every(item => item._id !== id)){
                await dispatch(getMessages({auth, id}))
                setTimeout(() => {/* El setTimeout se utiliza para asegurar que el desplazamiento hacia abajo ocurra después de que los nuevos mensajes se hayan agregado al DOM y se hayan renderizado correctamente. Aquí está cómo funciona:

                    Después de que se agregan nuevos mensajes y se actualiza el estado que contiene los mensajes (data), se llama al setTimeout.
                    Dentro del setTimeout, refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'}) se ejecuta después de un breve período de tiempo, en este caso, 50 milisegundos (50).
                    El propósito de este setTimeout es permitir que el navegador tenga tiempo suficiente para actualizar la interfaz de usuario con los nuevos mensajes antes de desplazar la vista hacia abajo. Esto asegura una transición suave y evita que el desplazamiento hacia abajo ocurra antes de que los nuevos mensajes se hayan renderizado completamente.*/
                  
                    refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
                },50)
            }
        }
        getMessagesData()
    },[id, dispatch, auth, message.data])





    // Load More
/*Esta función utiliza el IntersectionObserver para detectar cuándo el botón "Load more" (pageEnd) está casi visible en la ventana gráfica del navegador. Aquí está cómo funciona:
Se crea una instancia de IntersectionObserver que observa el elemento pageEnd.current, que es una referencia al botón "Load more".
Se configura el threshold en 0.1, lo que significa que la función de devolución de llamada se ejecutará cuando al menos el 10% del elemento observado esté visible en la ventana gráfica del navegador.
Cuando el elemento observado (en este caso, el botón "Load more") está a punto de ser visible (cuando entries[0].isIntersecting es true), la función de devolución de llamada incrementa el estado isLoadMore en 1.
Esto indica que el usuario ha llegado al final de la página y desea cargar más mensajes.
Entonces, básicamente, esta función permite cargar más mensajes cuando el usuario se acerca al final de la página, proporcionando una experiencia de desplazamiento infinito para los mensajes en el chat.

*/
 useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setIsLoadMore(p => p + 1)
            }
        },{
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    },[setIsLoadMore])





/*
Esta función useEffect se encarga de cargar más mensajes cuando se detecta que el usuario ha llegado al final de la lista de mensajes y hay más mensajes disponibles para cargar. Aquí hay un desglose detallado de cómo funciona:

Dependencia de isLoadMore: La función useEffect se ejecuta cada vez que el estado isLoadMore cambia.

Verificación de isLoadMore > 1: La función se activa solo si isLoadMore es mayor que 1. Esto es para asegurarse de que no se ejecuta en la primera carga de la página.

Verificación de result y page: La condición if(result >= page * 9) comprueba si hay más mensajes para cargar. Aquí:

result es el número total de mensajes que ya se han cargado.
page es el número de páginas que se han cargado.
La condición result >= page * 9 se asegura de que hay suficientes mensajes en la base de datos para justificar una nueva carga de página (asumiendo que cada página carga 9 mensajes).
Carga de más mensajes: Si la condición es verdadera, se despacha la acción loadMoreMessages con los parámetros auth, id, y page + 1:

auth: Los datos de autenticación del usuario actual.
id: El ID de la conversación actual.
page: page + 1: Incrementa el número de página para cargar la siguiente página de mensajes.
Reinicialización de isLoadMore: Después de despachar la acción para cargar más mensajes, isLoadMore se reinicia a 1 para evitar cargas innecesarias adicionales hasta que el usuario vuelva a desplazarse al final de la lista de mensajes.

En resumen, esta función se asegura de que los mensajes adicionales se carguen automáticamente cuando el usuario se desplaza al final de la lista, proporcionando una experiencia de desplazamiento infinito.*/

    useEffect(() => {
        if(isLoadMore > 1){
            if(result >= page * 9){
                dispatch(loadMoreMessages({auth, id, page: page + 1}))
                setIsLoadMore(1)
            }
        }
        // eslint-disable-next-line
    },[isLoadMore])

    const handleDeleteConversation = () => {
        if(window.confirm('Do you want to delete?')){
            dispatch(deleteConversation({auth, id}))
            return history.push('/message')
        }
    }

    // Call
    const caller = ({video}) => {
        const { _id, avatar, username, fullname } = user

        const msg = {
            sender: auth.user._id,
            recipient: _id, 
            avatar, username, fullname, video
        }
        dispatch({ type: GLOBALTYPES.CALL, payload: msg })
    }

    const callUser = ({video}) => {
        const { _id, avatar, username, fullname } = auth.user

        const msg = {
            sender: _id,
            recipient: user._id, 
            avatar, username, fullname, video
        }

        if(peer.open) msg.peerId = peer._id

        socket.emit('callUser', msg)
    }

    const handleAudioCall = () => {
        caller({video: false})
        callUser({video: false})
    }
    
    const handleVideoCall = () => {
        caller({video: true})
        callUser({video: true})
    }

    return (
        <>
            <div className="message_header" style={{cursor: 'pointer'}} >
                {
                    user.length !== 0 &&
                    <UserCard user={user}>
                        <div>
                            <i className="fas fa-phone-alt"
                            onClick={handleAudioCall} />

                            <i className="fas fa-video mx-3"
                            onClick={handleVideoCall} />

                            <i className="fas fa-trash text-danger"
                            onClick={handleDeleteConversation} />
                        </div>
                    </UserCard>
                }
            </div>

            <div className="chat_container" 
            style={{height: media.length > 0 ? 'calc(100% - 180px)' : ''}} >
                <div className="chat_display" ref={refDisplay}>
                    <button style={{marginTop: '-25px', opacity: 0}} ref={pageEnd}>
                        Load more
                    </button>

                    {
                        data.map((msg, index) => (
                                <div key={index}>
                                    {
                                        msg.sender !== auth.user._id &&
                                        <div className="chat_row other_message">
                                            <MsgDisplay user={user} msg={msg} theme={theme} />
                                        </div>
                                    }

                                    {
                                        msg.sender === auth.user._id &&
                                        <div className="chat_row you_message">
                                            <MsgDisplay user={auth.user} msg={msg} theme={theme} data={data} />
                                        </div>
                                    }
                                </div>
                        ))
                    }
                    

                   {
                       loadMedia && 
                       <div className="chat_row you_message">
                           <img src={LoadIcon} alt="loading"/>
                       </div>
                   }

                </div>
            </div>

            <div className="show_media" style={{display: media.length > 0 ? 'grid' : 'none'}} >
                {
                    media.map((item, index) => (
                        <div key={index} id="file_media">
                            {
                                item.type.match(/video/i)
                                ? videoShow(URL.createObjectURL(item), theme)
                                : imageShow(URL.createObjectURL(item), theme)
                            }
                            <span onClick={() => handleDeleteMedia(index)} >&times;</span>
                        </div>
                    ))
                }
            </div>

            <form className="chat_input" onSubmit={handleSubmit} >
                <input type="text" placeholder="Enter you message..."
                value={text} onChange={e => setText(e.target.value)}
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    background: theme ? '#040404' : '',
                    color: theme ? 'white' : ''
                }} />

                <Icons setContent={setText} content={text} theme={theme} />

                <div className="file_upload">
                    <i className="fas fa-image text-danger" />
                    <input type="file" name="file" id="file"
                    multiple accept="image/*,video/*" onChange={handleChangeMedia} />
                </div>

                <button type="submit" className="material-icons" 
                disabled={(text || media.length > 0) ? false : true}>
                    near_me
                </button>
            </form>
        </>
    )
}

export default RightSide
