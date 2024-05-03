 
import { useSelector, useDispatch } from 'react-redux';
import { commentconbloqueo, commentsinbloqueo } from '../../redux/actions/bloqueos/bloquecommentAction';
 
 import UserCard from './../UserCard';
  

const Bloquecomment = () => {
  const { auth, usersReducer  } = useSelector(state => state);
  


  const dispatch = useDispatch();
 

 
 


  const handleChangeblocagecomment= async (user, selectedblocage) => {
    switch (selectedblocage) {

      case 'non-bloque-comment':
          await dispatch(commentsinbloqueo(user, auth));
          break;

      case 'bloque-comment':
        await dispatch(commentconbloqueo(user, auth));
        break;
    
      default:
        break;
    }
  };

  return (
    <div className='container'>
    <table className='table'>
      <thead>
        <tr>
          <th>Utilizateur</th>
          <th>Bloquage Actuel comment</th>
          <th>Change blocage</th>
        </tr>
      </thead>
      <tbody>
        {usersReducer.users.map((user) => (
             user._id !== auth.user._id && user.role !== 'admin' && (
          <tr key={user._id}>
            <td>
              <UserCard user={user} />
            </td>
            <td>{user.bloquecomment}</td>

            <td>
              <select
                className='form-control'
                onChange={(e) => handleChangeblocagecomment(user, e.target.value)}
              >
                <option value=''>Seleccione bloquage comment</option>
                <option value='non-bloque-comment'>Non bloqué Comment</option>
                <option value='bloque-comment'>Bloqué Commen</option>
              
              </select>
            </td>
          </tr>
             )
        ))}
      </tbody>
    </table>
    

  </div>
  
  );
};
export default Bloquecomment