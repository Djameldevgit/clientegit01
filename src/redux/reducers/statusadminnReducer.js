import { GLOBALTYPES } from '../actions/globalTypes'


const statusadminnReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.STATUSADMIN:
            return action.payload;
        default:
            return state;
    }
}


export default statusadminnReducer