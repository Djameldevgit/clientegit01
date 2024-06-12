import { SERVICIO_TYPES } from '../actions/servicioAction';
 
import { EditData, DeleteData } from '../actions/globalTypes';
 
 
const initialState = {
    loading: false,
    servicios: [],
    result: 0,
    page: 2,
};

const servicioReducer = (state = initialState, action) => {
    switch (action.type) {

        case SERVICIO_TYPES.GET_SERVICIOS:
            return {
                ...state,
                servicios: action.payload.servicios,
                result: action.payload.result,
                page: action.payload.page
            };
        case SERVICIO_TYPES.UPDATE_SERVICIO:
            return {
                ...state,
                servicios: EditData(state.servicios, action.payload._id, action.payload)
            };
        case SERVICIO_TYPES.DELETE_SERVICIO:
            return {
                ...state,
                servicios: DeleteData(state.servicios, action.payload._id)
            };
            case SERVICIO_TYPES.INCREMENT_VIEWS:
                return {
                    ...state,
                    servicios: state.servicios.map(post =>
                      post._id === action.payload ? { ...post, vistas: post.vistas + 1 } : post
                    ),
                  };
               

        default:
            return state;
    }
}

export default servicioReducer;
