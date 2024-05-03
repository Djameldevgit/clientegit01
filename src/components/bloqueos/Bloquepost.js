 
import { useSelector, useDispatch } from 'react-redux';
import { postconbloqueo, postsinbloqueo, bloqueuser, nonlbloqueuser } from '../../redux/actions/bloqueos/bloquepostAction';
 
 
import UserCard from './../UserCard'
 

const Bloquepost= () => {
  const { auth, usersReducer   } = useSelector(state => state);
   
  const dispatch = useDispatch();
  
  const handleChangeblocagepost= async (user, selectedblocage) => {
    switch (selectedblocage) {

      case 'non-bloque-post':
          await dispatch(postsinbloqueo(user, auth));
          break;

      case 'bloque-post':
        await dispatch(postconbloqueo(user, auth));
        break;
    
        case 'bloque-user':
          await dispatch(bloqueuser(user, auth));
          break;

          case 'non-bloque-user':
            await dispatch(nonlbloqueuser(user, auth));
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
          <th>Bloquage Actuel post</th>
          <th>Change blocage post</th>
        </tr>
      </thead>
      <tbody>
        {usersReducer.users.map((user) => (
             user._id !== auth.user._id && user.role !== 'admin' && (
          <tr key={user._id}>
            <td>
              <UserCard user={user} />
            </td>
            <td>{user.bloquepost}</td>

            <td>
              <select
                className='form-control'
                onChange={(e) => handleChangeblocagepost(user, e.target.value)}
              >
                <option value=''>Seleccione bloquage post</option>
                <option value='non-bloque-post'>Non bloqué Post</option>
                <option value='bloque-post'>Bloqué Post</option>
                <option value='non-bloque-user'>Non bloqué ulitizateur</option>
                <option value='bloque-user'>Bloqué utilizateur</option>



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
export default Bloquepost