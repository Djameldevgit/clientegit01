import { BLOQUEOSPOST_TYPES } from "../../actions/bloqueos/bloquepostAction";

 
 
 
const initialState = {
  bloquepost: "",
  user: null,
 
};



const bloqueopostReducer = (state = initialState, action) => {
 
  
  switch (action.type) {
    case BLOQUEOSPOST_TYPES.LOADING:
      return {
          ...state,
          loading: action.payload
      };


    case BLOQUEOSPOST_TYPES.NOBLOQUEADO:
      return {
        ...state,
        bloquepost: "non-bloque-post",
        user: action.payload.user
      };
    case BLOQUEOSPOST_TYPES.BLOQUEADO:
      return {
        ...state,
        bloquepost: "bloque-post",
        user: action.payload.user
      };
      case BLOQUEOSPOST_TYPES.BLOQUEADOUSER:
        return {
          ...state,
          bloquepost: "bloque-user",
          user: action.payload.user
        };
        case BLOQUEOSPOST_TYPES.DESBLOQUEADOUSER:
          return {
            ...state,
            bloquepost: "non-bloque-user",
            user: action.payload.user
          };
    
  

    default:
      return state;
  }
};

export default bloqueopostReducer;
