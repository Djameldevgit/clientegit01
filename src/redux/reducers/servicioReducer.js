import { SERVICIO_TYPES } from '../actions/servicioAction';
 
import { EditData, DeleteData } from '../actions/globalTypes';
import { SERVICIOAPROVE_TYPES } from '../actions/servicioaproveAction';

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
                page: action.payload.page,
            };
        case SERVICIO_TYPES.UPDATE_SERVICIO:
            return {
                ...state,
                servicios: EditData(state.servicios, action.payload._id, action.payload),
            };
        case SERVICIO_TYPES.DELETE_SERVICIO:
            return {
                ...state,
                servicio: DeleteData(state.servicios, action.payload._id),
            };
        case SERVICIO_TYPES.INCREMENT_VIEWS:
            return {
                ...state,
                servicios: state.servicios.map(servicio =>
                    servicio._id === action.payload ? { ...servicio, vistas: servicio.vistas + 1 } : servicio
                ),
            };
        case SERVICIOAPROVE_TYPES.GET_SERVICIOS_PENDIENTES:
            return {
                ...state,
                servicios: action.payload.servicios,
                result: action.payload.result,
                page: action.payload.page,
            };
        case SERVICIOAPROVE_TYPES.CREATE_SERVICIO_PENDIENTE:
            return {
                ...state,
                servicios: [action.payload, ...state.servicios],
            };
        case SERVICIOAPROVE_TYPES.DELETE_SERVICIO_PENDIENTE:
            return {
                ...state,
                servicios: DeleteData(state.servicios, action.payload._id),
            };
        case SERVICIOAPROVE_TYPES.LOADING_SERVICIO:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default servicioReducer;
