 

import React ,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
 
import { getDataAPI } from '../../utils/fetchData';
import { fetchTotalUsersCount,   USER_TYPES } from '../../redux/actions/userAction';
 
const ListUsersTotal = () => {
  const { homeUsers, auth } = useSelector(state => state);
  const { totalUsersCount } = useSelector(state => state.homeUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
  
        
        const totalUsersRes = await getDataAPI('users/count', auth.token);
        dispatch({
          type: USER_TYPES.SET_USERS_COUNTS,
          payload: {
            total: totalUsersRes.data.count,
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCounts();
  }, [auth.token, dispatch]);

  // Efecto para obtener el conteo total de usuarios
  useEffect(() => {
    if (auth.token) {
      dispatch(fetchTotalUsersCount(auth.token));
    }
  }, [dispatch, auth.token]);

  
  

  return (
    <div className="container mt-5">
   
    
          <div className="col-md-6 col-sm-12">
           
              <p   >
                Total de usuarios: <strong>{totalUsersCount}</strong>
              </p>
            </div>
            
            <h2 className="text-center">Total usuarios: <strong>{homeUsers.count}</strong></h2>
         
 
    </div>
  );
};

export default ListUsersTotal;
