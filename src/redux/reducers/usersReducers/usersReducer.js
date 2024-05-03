import { DeleteData, EditData } from '../../actions/globalTypes';
import { USERS_TYPES } from '../../actions/users/usersAction';

const initialState = {
  loading: false,
  users: [],
  result: 0,
  page: 2,

};
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_TYPES.LOADING:

      return {
        ...state,
        loading: action.payload
      };
    case USERS_TYPES.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
        result: action.payload.result
      };
      case USERS_TYPES.GETYAMINA:
        return {
          ...state,
          userPosts: action.payload
        };

        case USERS_TYPES.POSTYAMINA:
          return {
            ...state,
            userPosts: action.payload
          };


    case USERS_TYPES.GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload
      };
    case USERS_TYPES.GET_USER_COMMENTS:
      return {
        ...state,
        userComments: action.payload
      };
    case USERS_TYPES.GET_USER_LIKES:
      return {
        ...state,
        userLikes: action.payload
      };


    case USERS_TYPES.DELETE_USER:
      return {
        ...state,
        users: DeleteData(state.users, action.payload._id)
      };
    case USERS_TYPES.EDIT_USER:
      const updatedUsers = state.users.map(user => {
        if (user._id === action.payload._id) {
          return action.payload.updatedUser;
        } else {
          return user;
        }
      });
      return {
        ...state,
        users: updatedUsers
      };
    case USERS_TYPES.BLOCK_USER:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload)
      };

    case USERS_TYPES.UNBLOCK_USER:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload)
      };
    default:
      return state;
  }
}

export default usersReducer;
