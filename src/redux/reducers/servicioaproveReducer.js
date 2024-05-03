import { DeleteData } from "../actions/globalTypes";
import { SERVICIOAPROVE_TYPES } from "../actions/servicioaproveAction";

const initialState = {
    loading: false,
    servicios: [],
    result: 0,
    page: 2
}

const servicioaproveReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERVICIOAPROVE_TYPES.CREATE_SERVICIO_PENDIENTE:
            return {
                ...state,
                servicios: [action.payload, ...state.servicios]
            };

        case SERVICIOAPROVE_TYPES.GET_SERVICIOS_PENDIENTES:
            return {
                ...state,
                servicios: action.payload.servicios,
                result: action.payload.result,
                page: action.payload.page
            };

        case SERVICIOAPROVE_TYPES.LOADING_SERVICIO:
            return {
                ...state,
                loading: action.payload
            };

        case SERVICIOAPROVE_TYPES.APROVE_SERVICIO_PENDIENTE:
            const updatedServicio = state.servicios.map((servicio) =>
                servicio._id === action.payload._id
                    ? { ...servicio, estado: 'aprovado' }
                    : servicio
            );
            return {
                ...state,
                servicios: updatedServicio,
            };

        case SERVICIOAPROVE_TYPES.DELETE_SERVICIO_PENDIENTE:
            return {
                ...state,
                servicios: DeleteData(state.servicios, action.payload._id)
            };

        default:
            return state;
    }
}

export default servicioaproveReducer;
