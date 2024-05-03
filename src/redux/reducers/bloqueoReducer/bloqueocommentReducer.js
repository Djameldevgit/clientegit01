import { BLOQUEOSCOMMENT_TYPES } from "../../actions/bloqueos/bloquecommentAction";
 
 
 
const initialState = {
  bloquecomment: "",
  user: null,
 
};



const bloqueocommentReducer = (state = initialState, action) => {
 
  
  switch (action.type) {
    case BLOQUEOSCOMMENT_TYPES.LOADING:
      return {
          ...state,
          loading: action.payload
      };


    case BLOQUEOSCOMMENT_TYPES.NOBLOQUEADO:
      return {
        ...state,
        bloquecomment: "non-bloque-comment",
        user: action.payload.user
      };
    case BLOQUEOSCOMMENT_TYPES.BLOQUEADO:
      return {
        ...state,
        bloquecomment: "bloque-comment",
        user: action.payload.user
      };

  

    default:
      return state;
  }
};

export default bloqueocommentReducer;
