import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import alert2 from './alert2Reducer'
import theme from './themeReducer'
import profile from './profileReducer'
import status from './statusReducer'
import statusservicio from './statusservicioReducer'
import statusadmin from './statusadminnReducer'
import homePostsReducer from './postReducer'
import homePostsadminReducer from './postadminReducer'
import homeServiciosReducer from './servicioReducer'


 

import modal from './modalReducer'
import detailPost from './detailPostReducer'
import detailServicio from './detailServicioReducer'
import detailPostadmin from './detailPostAdminReducer'

import discover from './discoverReducer'
import suggestions from './suggestionsReducer'
import socket from './socketReducer'
import notify from './notifyReducer'
import message from './messageReducer'
import online from './onlineReducer'
import call from './callReducer'
import peer from './peerReducer'
import languagee from './languageReducer'

import usersReducer from './usersReducers/usersReducer'



import bloqueopostReducer from './bloqueoReducer/bloqueopostReducer'
import bloqueocommentReducer from './bloqueoReducer/bloqueocommentReducer'
import roleReducer from './rolee/roleeReducer'
import postaproveReducer from './postaproveReducer'
import servicioaproveReducer from './servicioaproveReducer'
import statussearch from './statussearch'
import messagesadminReducer from './messagesadminReducer'






export default combineReducers({
    auth,
    alert,
    alert2,
    theme,
    profile,
    status,
    statusservicio,
    statussearch,
    statusadmin,
    homePostsReducer,
    homePostsadminReducer,
    homeServiciosReducer,
    modal,
    detailPost,
    detailServicio,

    detailPostadmin,
    discover,
    suggestions,
    socket,
    notify,
    message,
    online,
    call,
    peer,
    languagee,
    bloqueocommentReducer,
    bloqueopostReducer,
    roleReducer,
    usersReducer,
    postaproveReducer,
    servicioaproveReducer,
    messagesadminReducer
})