import { DeleteData } from "../actions/globalTypes";
import { POSTAPROVE_TYPES } from "../actions/postaproveAction";

 
 
const initialState = {
    loading: false,
    posts: [],
    result: 0,
    page: 2
}

const postaproveReducer = (state = initialState, action) => {
    switch (action.type){
 
        case POSTAPROVE_TYPES.CREATE_POST_PENDIENTE:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
   
            case POSTAPROVE_TYPES.GET_POSTS_PENDIENTES:
                return {
                  ...state,
                  posts: action.payload.posts,
                  result: action.payload.result,
                  page: action.payload.page
                };
   
            case POSTAPROVE_TYPES.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            };

            case POSTAPROVE_TYPES.APROVE_POST_PENDIENTE:
                const updatedpost = state.posts.map((post) =>
                post._id === action.payload._id
                  ? { ...post, estado: 'aprovado' }
                  : post
              );
              return {
                ...state,
                posts: updatedpost,
              };
              case POSTAPROVE_TYPES.DELETE_POST_PENDIENTE:
            return {
                ...state,
                posts: DeleteData(state.posts, action.payload._id)
            };

            default:
                return state;
    }
}

export default postaproveReducer