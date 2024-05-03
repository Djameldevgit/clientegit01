import { POSTADMIN_TYPES } from '../actions/postadminAction'
import { EditData, DeleteData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    posts: [],
    result: 0,
    page: 2
}

const postadminReducer = (state = initialState, action) => {
    switch (action.type){
        case POSTADMIN_TYPES.CREATE_POSTADMIN:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case POSTADMIN_TYPES.LOADING_POSTADMIN:
            return {
                ...state,
                loading: action.payload
            };
        case POSTADMIN_TYPES.GET_POSTSADMIN:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                page: action.payload.page
            };
        case POSTADMIN_TYPES.UPDATE_POSTADMIN:
            return {
                ...state,
                posts: EditData(state.posts, action.payload._id, action.payload)
            };
        case POSTADMIN_TYPES.DELETE_POSTADMIN:
            return {
                ...state,
                posts: DeleteData(state.posts, action.payload._id)
            };
        default:
            return state;
    }
}

export default postadminReducer