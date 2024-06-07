import { useEffect } from 'react'
 
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import axios from 'axios';
import ActivationEmail from './pages/auth/ActivationEmail'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'

 
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
 

import Statusmodalsearch from './components/statusmodelll/Statusmodalsearch'
import StatusModalsalle from './components/statusmodelll/StatusModalsalle'
import StatusadminModal from './components/statusmodelll/StatusadminModal'
import Dashboard from './pages/user/dashboard'

 
 

function App() {
  const { auth, status, statusservicio, statusadmin, statussearch, modal, call } = useSelector(state => state)
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch()
  const userBlocked = user && user.bloquepost === 'bloque-user';
  
 
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/api/refresh_token', null)
        dispatch({ 
          type: GLOBALTYPES.AUTH, 
          payload: {
              token: res.data.access_token,
              user: res.data.user
          } 
      })
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

//sintaxis de template literals y operadores lógicos para aplicar una clase condicionalmente al elemento div
 //esta línea de código agrega dinámicamente la clase CSS mode al div si cualquiera de las variables status o modal es verdadera. Esto es útil para aplicar diferentes estilos dependiendo del estado de la aplicación.
//PageRender: Renderiza dinámicamente páginas basadas en la URL actual. Si la página solicitada no existe, muestra un componente NotFound.
//PrivateRouter: Protege rutas específicas redirigiendo a la página de inicio (/) si el usuario no ha iniciado sesión.
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

          <Route exact path="/cervicios" component={Cervicios} />

          <Route exact path="/administracion/postspendientes" component={Postspendientes} />


          

          <Route exact path="/administracion/serviciospendientes" component={Serviciospendientes} />
          <Route exact path="/categoriaslista/cervices" component={Cervices} />


          <Route exact path="/administracion/index" component={Index} />

 
          <Route exact path="/bloqueos/blockposts" component={Blockposts} />

          <Route
            path="/bloqueos"
            render={() => (userBlocked ? <Bloqueos /> : <Redirect to="/" />)}
          />
          <Route exact path="/salasfiestas" component={Salasfiestas} />
          <Route exact path="/roles/userRole" component={UserRole} />
          <Route exact path="/bloqueos/blockcomments" component={auth.token ? Blockcomments : Login} />
          <Route exact path="/bloqueos/blockposts" component={Blockposts} />

          <Route exact path="/users/usersposts" component={Usersposts} />
          <Route exact path="/infoclient" component={Infoclient} />

          <Route
            path="/bloqueos"
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
