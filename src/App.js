import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import ActivationEmail from './pages/auth/ActivationEmail'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'

import axios from 'axios'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'
import { getPostsPendientesss } from './redux/actions/postaproveAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction'
import CallModal from './components/message/CallModal'
 
import Blockposts from './pages/bloqueos/blockposts';
import Blockcomments from './pages/bloqueos/blockcomments';
import UserRole from './pages/roles/userRole';
import Usersposts from './pages/users/usersposts'

import { getUsers } from './redux/actions/users/usersAction'
import { getPostsadmin } from './redux/actions/postadminAction'


import Bloqueos from './pages/bloqueos'
import Cervices from './pages/categoriaslista/cervices'
import Statusmodalservicio from './components/statusmodelll/StatusModalservicio'
import { getServicios } from './redux/actions/servicioAction'

import Index from './pages/administracion'

import Cervicios from './pages/cervicios'
import Salasfiestas from './pages/salasfiestas'
import Postspendientes from './pages/administracion/postspendientes'
import Serviciospendientes from './pages/administracion/serviciospendientes'
import { getServiciosPendientesss } from './redux/actions/servicioaproveAction'
//import Notificacionesusuario from './pages/notificacionesusuario'
import Infoclient from './pages/infoclient'
import Pagos from './pages/administracion/Pagos'

import Statusmodalsearch from './components/statusmodelll/Statusmodalsearch'
import StatusModalsalle from './components/statusmodelll/StatusModalsalle'
import StatusadminModal from './components/statusmodelll/StatusadminModal'
import Dashboard from './pages/user/dashboard'

 
 
import Autentcicacionn from './pages/administracion/autentication/autentcicacionn'
import Autenticacionemail from './pages/administracion/autentication/autenticacionemail';
 import Activarcuenta from './pages/administracion/autentication/activarcuenta'
import Contadorr from './pages/administracion/autentication/contadorr'
 


function App() {
  const { auth, status, statusservicio, statusadmin, statussearch, modal, call } = useSelector(state => state)
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch()
  const userBlocked = user && user.bloquepost === 'bloque-user';
  


//se debe hacer lo mejor para estas cosas ya que la porgarmecio
  //<Route exact path="/pages/twiliosmsss" component={Tttwliosms} />
  //<Route exact path="/pages/notificacionesusuario" component={Notificacionesusuario} />

 
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/api/refresh_token', null)
        dispatch({type: GLOBALTYPES.AUTH, payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])
  

 
  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])




  useEffect(() => {
    dispatch(getPosts())
    dispatch(getServicios())

    if (auth.token) {

      dispatch(getPostsadmin(auth.token))
      dispatch(getUsers(auth.token))
      dispatch(getPostsPendientesss(auth.token))
      dispatch(getServiciosPendientesss(auth.token))
  

      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])


  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") { }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") { }
      });
    }
  }, [])


 

  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || statusservicio || statussearch || statusadmin || modal) && 'mode'}`}>
        <div className="main">
          <Header />

          {statussearch && <Statusmodalsearch />}
          {status && <StatusModalsalle />}
          {statusservicio && <Statusmodalservicio />}
          {statusadmin && <StatusadminModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <Route exact path="/" component={Home} />

          <Route exact path="/register" component={Register} />
          <Route path="/activate/:activation_token" component={ActivationEmail} exact />

           <Route path="/forgot_password" component={ForgotPassword} exact />
           <Route path="/reset/:token" component={ResetPassword} exact />
          <Route exact path="/login" component={Login} />
          <Route exact path="/user/dashboard" component={Dashboard} />

          <Route exact path="/pages/cervicios" component={Cervicios} />

          <Route exact path="/pages/administracion/postspendientes" component={Postspendientes} />


          

          <Route exact path="/pages/administracion/serviciospendientes" component={Serviciospendientes} />
          <Route exact path="/pages/categoriaslista/cervices" component={Cervices} />


          <Route exact path="/pages/administracion/index" component={Index} />


          <Route exact path="/pages/administracion/autentication/activarcuenta" component={Activarcuenta} />
          <Route exact path="/pages/administracion/autentication/autenticationn" component={Autentcicacionn} />
          <Route exact path="/pages/administracion/autentication/autenticacionemail" component={Autenticacionemail} />
           <Route exact path="/pages/administracion/autentication/contadorr" component={Contadorr} />





        


          <Route exact path="/pages/administracion/pagos" component={Pagos} />

          <Route exact path="/pages/bloqueos/blockposts" component={Blockposts} />

          <Route
            path="/pages/bloqueos"
            render={() => (userBlocked ? <Bloqueos /> : <Redirect to="/" />)}
          />
          <Route exact path="/pages/salasfiestas" component={Salasfiestas} />
          <Route exact path="/pages/roles/userRole" component={UserRole} />
          <Route exact path="/pages/bloqueos/blockcomments" component={auth.token ? Blockcomments : Login} />
          <Route exact path="/pages/bloqueos/blockposts" component={Blockposts} />

          <Route exact path="/pages/users/usersposts" component={Usersposts} />
          <Route exact path="/pages/infoclient" component={Infoclient} />

          <Route
            path="/pages/bloqueos"
            render={() => (userBlocked ? <Bloqueos /> : <Redirect to="/" />)}
          />
          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />

        </div>
      </div>
    </Router>
  );
}

export default App;
