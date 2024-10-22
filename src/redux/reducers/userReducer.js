import { USER_TYPES } from '../actions/userAction';
import { EditData, DeleteData } from '../actions/globalTypes';

const initialState = {
    loading: false,
    users: [],
    activeLast24hUsers: [],  // Asegúrate de que esto esté inicializado
    activeLast3hUsers: [],    // Asegúrate de que esto esté inicializado
    totalUsersCount: 0,
    result: 0,
    page: 2,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_TYPES.LOADING_USER:
            return {
                ...state,
                loading: action.payload
            };
            case USER_TYPES.GET_TOTAL_USERS_COUNT:
                return {
                    ...state,
                    totalUsersCount: action.payload,
                };
        case USER_TYPES.GET_USERS:
            return {
                ...state,
                users: action.payload.users,
                result: action.payload.result,
                page: action.payload.page
            };
        case USER_TYPES.UPDATE_USER:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
            };
        case USER_TYPES.DELETE_USER:
            return {
                ...state,
                users: DeleteData(state.users, action.payload._id)
            };
        case USER_TYPES.GET_ACTIVE_USERS_LAST_24H:
            return {
                ...state,
                activeLast24hUsers: Array.isArray(action.payload) ? action.payload : [], // Asegurar array
                result: action.payload.result,
                page: action.payload.page
            };
        case USER_TYPES.GET_ACTIVE_USERS_LAST_3H:
            return {
                ...state,
                activeLast24hUsers: Array.isArray(action.payload) ? action.payload : [], // Asegurar array
                result: action.payload.result,
                page: action.payload.page
           
            };
        default:
            return state;
    }
};


export default userReducer;
