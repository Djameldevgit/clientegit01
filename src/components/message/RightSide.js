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
/*Estados Dinámicos:
user: Información del usuario del chat.
text: Texto del mensaje en composición.
media: Archivos multimedia adjuntos.
loadMedia: Estado de carga de archivos multimedia.
data: Mensajes de la conversación actual.
result: Número total de mensajes.
page: Página actual para la paginación.
isLoadMore: Indicador para cargar más mensajes.
Estos estados y referencias permiten al componente manejar eficientemente la lógica del chat, incluyendo la carga y envío de mensajes, así como la paginación y la gestión de archivos multimedia.
*/
const RightSide = () => {
    const { auth, message, theme, socket, peer } = useSelector(state => state)
    const dispatch = useDispatch()

    const { id } = useParams()
    const [user, setUser] = useState([])//Almacena la información del usuario con el que se está chateando. Se inicializa como un array vacío.
    const [text, setText] = useState('')//Almacena el texto del mensaje que el usuario está escribiendo. Se inicializa como una cadena vacía.
    const [media, setMedia] = useState([])//Almacena los archivos multimedia (imágenes, videos, etc.) que el usuario adjunta al mensaje. Se inicializa como un array vacío.

    const [loadMedia, setLoadMedia] = useState(false)//Indica si los archivos multimedia están en proceso de carga. Se inicializa como false.

    const refDisplay = useRef()//Referencia al contenedor de mensajes, utilizada para desplazarse automáticamente hacia abajo cuando se envía un nuevo mensaje.
    const pageEnd = useRef()//detectar cuando el usuario llega al final y cargar más mensajes

    const [data, setData] = useState([])//Almacena los mensajes de la conversación actual. Se inicializa como un array vacío.
    const [result, setResult] = useState(9)//Almacena el número total de mensajes obtenidos para la conversación actual. Se inicializa con 9
    const [page, setPage] = useState(0)//Almacena el número de la página actual para la paginación de mensajes. Se inicializa con 0.
    const [isLoadMore, setIsLoadMore] = useState(0)//Controla si se deben cargar más mensajes cuando el usuario se desplaza al final de la lista de mensajes. Se inicializa con 0

    const history = useHistory()

    useEffect(() => {//El useEffect hook en este componente se encarga de actualizar el estado de los mensajes y la paginación cada vez que cambia el id de la conversación o los datos de mensajes en el estado global:
        const newData = message.data.find(item => item._id === id)//Busca en message.data la conversación que coincide con el id actual. Si se encuentra, actualiza el estado local (data, result, page) con los mensajes, el número total de mensajes y la página actual de esa conversación.
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

    const handleSubmit = async (e) => {//envío de mensajes en el chat, incluyendo el texto y los archivos multimedia adjuntos
        e.preventDefault()
        if(!text.trim() && media.length === 0) return;//Verifica que haya contenido en el mensaje.  Verifica que el mensaje no esté vacío. Si no hay texto (después de eliminar los espacios en blanco) y no hay archivos multimedia, la función retorna sin hacer nada.
        setText('')
        setMedia([])
        setLoadMedia(true)

        let newArr = [];
        if(media.length > 0) newArr = await imageUpload(media)

        const msg = {//Creación del Objeto del Mensaje:Crea un objeto msg que contiene toda la información del mensaje: el ID del remitente (auth.user._id), el ID del destinatario (id), el texto del mensaje (text), los archivos multimedia cargados (newArr), y la marca de tiempo de creación (createdAt)
            sender: auth.user._id,
            recipient: id,
            text, 
            media: newArr,
            createdAt: new Date().toISOString()
        }

        setLoadMedia(false)
        await dispatch(addMessage({msg, auth, socket}))
        if(refDisplay.current){//Propósito: Desplaza automáticamente la vista hacia el final del contenedor de mensajes, asegurando que el nuevo mensaje sea visible. Esto se hace solo si refDisplay.current no es nulo.
            refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        }
    }

    useEffect(() => {
        const getMessagesData = async () => {
            if(message.data.every(item => item._id !== id)){
                await dispatch(getMessages({auth, id}))
                setTimeout(() => {
                    refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
                },50)
            }
        }
        getMessagesData()
    },[id, dispatch, auth, message.data])


    // Load More
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
                <input type="text" placeholder="Entrez votre message..."
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
