 import { POSTADMIN_TYPES } from '../actions/postadminAction'
import { EditData } from '../actions/globalTypes'


const detailPostadminReducer = (state = [], action) => {
   
    switch (action.type){
        case POSTADMIN_TYPES.GET_POSTADMIN:
            return [...state, action.payload]
            case POSTADMIN_TYPES.UPDATE_POSTADMIN:
            return EditData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}


export default detailPostadminReducer