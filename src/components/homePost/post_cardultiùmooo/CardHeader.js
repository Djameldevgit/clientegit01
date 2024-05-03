import React from 'react'
import Avatar from '../../Avatar'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { aprovarPostPendiente, deletePostPendiente } from '../../../redux/actions/postaproveAction'
import { useTranslation } from 'react-i18next'
 
const CardHeader = ({ post }) => {
 
 
    const { languagee, auth, socket } = useSelector(state => state)
   const dispatch = useDispatch()
    const { t } = useTranslation();

    const history = useHistory()

    const handleAprove = () => {


        // Mostrar la ventana de confirmación personalizada
        const confirmAction = window.confirm("¿Vous voulez aprouve ce post?")
        if (confirmAction) {
            dispatch(aprovarPostPendiente(post, 'aprovado', auth));
            return history.push("#");
        }
    };


    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } })
    }

    const handleDeletePost = () => {
        if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
            dispatch(deletePostPendiente({ post, auth, socket }))
            return history.push("#")
        }
    }

    
    return (
        <div className="card-body">
            <div className="d-flex">
                <Avatar src={post.user.avatar} size="big-avatar" />

                <div className="card_name">
                    <h5 className="m-0">
                        <Link to='#' className="text-primary">
                          {post.content}
                        </Link>
                    </h5>

                 
                </div>
           

            <div className="nav-item dropdown ml-auto">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu">
                    {auth.user && ( // Verifica si auth.user está definido
                        (auth.user._id === post.user._id || auth.user.role === 'admin') && (
                            <>
                                <div className="dropdown-item" onClick={handleAprove}>
                                    <span className="material-icons">create</span> Approuver  
                                </div>
                                <div className="dropdown-item" onClick={handleDeletePost} >
                                    <span className="material-icons">delete_outline</span>Supprimer 
                                </div>
                                <div className="dropdown-item" onClick={handleEditPost}>
                                    <span className="material-icons">create</span>Modifier
                                </div>
                            </>
                        )
                    )}:
                 
                    
                </div>
                
            </div>
        </div>
        </div>

    )
}

export default CardHeader
