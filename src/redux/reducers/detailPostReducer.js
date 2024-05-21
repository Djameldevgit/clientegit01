import { POST_TYPES } from '../actions/postAction'
import { EditData } from '../actions/globalTypes'

const detailPostReducer = (state = [], action) => {//El reducer detailPostReducer maneja esta acción y actualiza detailPost con los nuevos datos del pos
    switch (action.type){
        case POST_TYPES.GET_POST:
            return [...state, action.payload]
        case POST_TYPES.UPDATE_POST:
            return EditData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}


export default detailPostReducer