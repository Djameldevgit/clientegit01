import React, { useState, useEffect, useRef } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useHistory, useParams } from 'react-router-dom'
import { MESS_TYPES, getConversations } from '../../redux/actions/messageAction'


const LeftSide = () => {
    const { auth, message, online } = useSelector(state => state)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    const history = useHistory()
    const { id } = useParams()

    const pageEnd = useRef()
    const [page, setPage] = useState(0)

    
    const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }

    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}})
        dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        return history.push(`/message/${user._id}`)
    }

    const isActive = (user) => {
        if(id === user._id) return 'active';
        return ''
    }

/*Exactamente. Al iniciar la aplicación, puede que no sea necesario obtener todas las conversaciones de inmediato, ya que el usuario podría estar explorando otras partes de la aplicación que no están relacionadas con la mensajería. Sin embargo, una vez que el usuario accede a la página o la sección de mensajes, es esencial cargar las conversaciones para que pueda ver con quién ha estado chateando y continuar sus interacciones.

Por lo tanto, se utiliza useEffect con la dependencia message.firstLoad para garantizar que la obtención de conversaciones solo se realice cuando el usuario accede a la página de mensajes por primera vez o cuando vuelve a ella después de haber estado en otra parte de la aplicació*/


    useEffect(() => {//firstLoad es una variable booleana que probablemente se utiliza para determinar si es la primera carga de la página o del componente en cuestión.
        if(message.firstLoad) return;
        dispatch(getConversations({auth}))
    },[dispatch, auth, message.firstLoad])

    // Load More

/*Este hook useEffect utiliza la API Intersection Observer para detectar cuándo un elemento específico en la página se vuelve visible para el usuario. En este caso, el elemento que se está observando es pageEnd.current, que probablemente sea una referencia a un elemento de final de página.

Cuando el elemento pageEnd.current se vuelve visible en la ventana del navegador (cuando su umbral de intersección es alcanzado, en este caso configurado en 0.1), la función de callback se ejecuta. En este caso, la función simplemente incrementa el estado de la página (setPage(p => p + 1)), lo que generalmente se utiliza para cargar más datos o contenido a medida que el usuario se desplaza hacia abajo en la página.

En resumen, este hook useEffect se utiliza para implementar "carga infinita" o "scroll infinito", donde más contenido se carga dinámicamente a medida que el usuario se desplaza hacia abajo en la página, lo que mejora la experiencia del usuario al proporcionar una experiencia de navegación continua y fluida.*/

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setPage(p => p + 1)
            }
        },{
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    },[setPage])








   /* Este hook useEffect se utiliza para cargar más conversaciones cuando el usuario se desplaza hacia abajo en la página y se necesitan más conversaciones para mostrar.

    La condición message.resultUsers >= (page - 1) * 9 && page > 1 verifica si el número total de usuarios recuperados (message.resultUsers) es mayor o igual al número esperado de usuarios a mostrar en la página actual ((page - 1) * 9) y si la página actual es mayor que 1. Esto significa que si hay más usuarios disponibles para mostrar y la página actual no es la primera, se ejecutará la acción getConversations para cargar más conversaciones.
    
    En resumen, esta función asegura que se carguen más conversaciones cuando el usuario se desplaza hacia abajo en la página y se necesitan más conversaciones para mostrar, mejorando así la experiencia del usuario al proporcionar un flujo continuo de contenido.*/
/*La función useEffect que mencionas es similar a la que ya discutimos, pero tiene una diferencia importante en la dependencia.

La primera función useEffect se dispara cuando message.resultUsers (el número total de usuarios recuperados) es suficiente para llenar la página actual y la página actual no es la primera. Mientras que la segunda función useEffect se dispara cada vez que cambia page, independientemente de si hay suficientes usuarios recuperados o no.

En términos prácticos, la primera función useEffect se asegura de cargar más conversaciones solo cuando sea necesario, mientras que la segunda función useEffect se ejecuta cada vez que se cambia de página, sin importar si hay suficientes datos para mostrar o no. Esto puede afectar el rendimiento si no se gestiona adecuadamente, ya que puede provocar múltiples solicitudes de red innecesarias.
*/
    useEffect(() => {
        if(message.resultUsers >= (page - 1) * 9 && page > 1){
            dispatch(getConversations({auth, page}))
        }
    },[message.resultUsers, page, auth, dispatch])
    






    // Check User Online - Offline

/*
    Esta función useEffect se dispara cuando el componente se carga inicialmente (message.firstLoad es verdadero). Su propósito es verificar si el usuario está en línea u fuera de línea y enviar esa información al estado global.

    Entonces, cada vez que message.firstLoad cambia a true, lo que indica que es la primera carga del componente, se despacha una acción (MESS_TYPES.CHECK_ONLINE_OFFLINE) para actualizar el estado con la información de conexión (online). Esto puede ser útil para mostrar visualmente si un usuario está en línea u fuera de línea en la interfaz de usuario*/

    useEffect(() => {
        if(message.firstLoad) {
            dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        }
    },[online, message.firstLoad, dispatch])

    return (
        <>
            <form className="message_header" onSubmit={handleSearch} >
                <input type="text" value={search}
                placeholder="Enter to Search..."
                onChange={e => setSearch(e.target.value)} />

                <button type="submit" style={{display: 'none'}}>Search</button>
            </form>

            <div className="message_chat_list">
                {
                    searchUsers.length !== 0
                    ?  <>
                        {
                            searchUsers.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} />
                                </div>
                            ))
                        }
                        
                    </>

/*El método find se utiliza aquí para determinar si el usuario actual (user) está siendo seguido por el usuario autenticado (auth.user). La condición item._id === user._id se verifica para cada elemento en el array auth.user.following. Si se encuentra un elemento en el array auth.user.following cuyo _id coincide con el _id del usuario actual (user), entonces se devuelve true, lo que significa que el usuario actual está siendo seguido por el usuario autenticado.

Esta lógica se utiliza para decidir si mostrar un indicador de estado de conexión (un círculo verde) junto al usuario en la lista. Si el usuario está en línea (user.online es verdadero), se muestra un círculo verde (<i className="fas fa-circle text-success" />). De lo contrario, se verifica si el usuario está siendo seguido por el usuario autenticado, y si es así, se muestra un círculo gris (<i className="fas fa-circle" />). Si el usuario no está siendo seguido, no se muestra ningún círculo.*/


                    : <>
                        {
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} msg={true}>
                                        {
                                            user.online
                                            ? <i className="fas fa-circle text-success" />
                                            : auth.user.following.find(item => 
                                                item._id === user._id
                                            ) && <i className="fas fa-circle" />
                                                
                                        }
                                        
                                    </UserCard>
                                </div>
                            ))
                        }
                    </>
                }
               
               <button ref={pageEnd} style={{opacity: 0}} >Load More</button>
            </div>
        </>
    )
}

export default LeftSide
