 
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
 
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePostadmin } from '../../../redux/actions/postadminAction'

 
const CardHeader = ({ post }) => {
    const { auth, socket } = useSelector(state => state)
 
    const dispatch = useDispatch()

    const history = useHistory()

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUSADMIN, payload: { ...post, onEdit: true } })
    }

    const handleDeletePost = () => {
        if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
            dispatch(deletePostadmin({ post, auth, socket }))
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
                        auth.user._id === post.user._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons">create</span> Edite Post admin
                            </div>
                            <div className="dropdown-item" onClick={handleDeletePost} >
                                <span className="material-icons">delete_outline</span> Suprimer Post admin
                            </div>
                        </>
                    }

                   
                </div>
            </div>
        </div>
    )
}

export default CardHeader
