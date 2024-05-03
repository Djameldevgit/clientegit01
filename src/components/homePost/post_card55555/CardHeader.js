 
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePost } from '../../../redux/actions/postAction'
 
import { aprovarPostPendiente } from '../../../redux/actions/postaproveAction'

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAprove = () => {


    // Mostrar la ventana de confirmación personalizada
    const confirmAction = window.confirm("¿Deseas aprobar esta agencias?")
    if (confirmAction) {
        dispatch(aprovarPostPendiente(post, 'aprovado', auth));
        return history.push("/administracion/postspendientes");
    }
};

  const handleEditPost = () => {
    if (auth && auth.user) {
      dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
    } else {
      // Puedes redirigir al usuario a una página de inicio de sesión o mostrar un mensaje de error
      console.log("Usuario no autenticado. Acceso denegado.");
    }
  };

  const handleDeletePost = () => {
    if (auth && auth.user) {
      if (window.confirm("Are you sure want to delete this post?")) {
        dispatch(deletePost({ post, auth, socket }));
        return history.push("/");
      }
    } else {

      console.log("Usuario no autenticado. Acceso denegado.");
    }
  };

  

  return (
    <div className="card_header">
      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          more_horiz
        </span>

        <div className="dropdown-menu">
          {(auth.user && (auth.user._id === post.user._id || auth.user.role === 'admin')) && (
            <>
              <div className="dropdown-item" onClick={handleAprove}>
                <span className="material-icons">create</span>  prouve la salle 
              </div>
              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons">delete_outline</span> Remove la salle 
              </div>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">create</span> Edit la salle' 
              </div>
            </>
          )}

 
        </div>
      </div>
    </div>
  );
};
export default CardHeader
