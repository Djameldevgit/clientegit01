import { MESSAGEADMIN_TYPE } from '../actions/messagesadminAction';
 
//import { EditData, DeleteData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    mensajes: [],
    result: 0,
    page: 2
}
 
const messagesadminReducer = (state = initialState, action) => {
    switch (action.type){
        case MESSAGEADMIN_TYPE.CREATE_MESSAGES:
            return {
                ...state,
                mensajes: [action.payload, ...state.mensajes]
            };
       
        case MESSAGEADMIN_TYPE.GET_MESSAGES:
            return {
                ...state,
                mensajes: action.payload.mensajes,
                result: action.payload.result,
                page: action.payload.page
            };
       /* case POSTADMIN_TYPES.UPDATE_POSTADMIN:
            return {
                ...state,
                posts: EditData(state.posts, action.payload._id, action.payload)
            };
        case POSTADMIN_TYPES.DELETE_POSTADMIN:
            return {
                ...state,
                posts: DeleteData(state.posts, action.payload._id)
            };*/
        default:
            return state;
    }
}
export default messagesadminReducer;
