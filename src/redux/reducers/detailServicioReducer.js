 
import { EditData } from '../actions/globalTypes'
import { SERVICIO_TYPES } from '../actions/servicioAction';
 
 
const detailServicioReducer = (state = [], action) => {
    switch (action.type){
        case SERVICIO_TYPES.GET_SERVICIO:
            return [...state, action.payload]
        case SERVICIO_TYPES.UPDATE_SERVICIO:
            return EditData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}


export default detailServicioReducer