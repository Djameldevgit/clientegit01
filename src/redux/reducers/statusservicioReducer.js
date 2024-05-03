import { GLOBALTYPES } from '../actions/globalTypes'


const statusservicioReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.STATUSSERVICIO:
            return action.payload;
        default:
            return state;
    }
}


export default statusservicioReducer