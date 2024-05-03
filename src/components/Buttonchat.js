import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MESS_TYPES } from '../redux/actions/messageAction';
 
const Buttonchat = ({ post }) => {
    const userid = post.user._id;
    const history = useHistory();
    const dispatch = useDispatch();

    const handleAddUser = () => {
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...post.user, text: '', media: [] }});
        history.push(`/message/${userid}`);
    };

    return (
        <div>
            <button onClick={handleAddUser}>Iniciar Conversación</button>
        </div>
    );
};

export default Buttonchat;

