
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { aprovarPostPendiente, deletePostPendiente } from '../../../redux/actions/postaproveAction'

const CardHeaderpostpendientes = ({ post }) => {
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleaprovePost = () => {
        const confirmAction = window.confirm("¿Deseas aprobar esta agencias?")
        if (confirmAction) {
            dispatch(aprovarPostPendiente(post, 'aprovado', auth));
            return history.push("/pages/administracion/sala");
        }

    }

    const handleDeletePost = () => {
        if (window.confirm("Are you sure want to delete this post?")) {
            dispatch(deletePostPendiente({ post, auth, socket }))
            return history.push("/")
        }
    }



    return (
        <div className="card_header">

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu">
                    {
                        auth.user.role === 'admin' && (
                            <>
                                <div className="dropdown-item" onClick={handleaprovePost}>
                                    <span className="material-icons">create</span> Approuver la publication
                                </div>
                                <div className="dropdown-item" onClick={handleDeletePost}>
                                    <span className="material-icons">delete_outline</span> Supprimer la publication
                                </div>
                            </>
                        )
                    }


                </div>
            </div>
        </div>
    )
}


export default CardHeaderpostpendientes
