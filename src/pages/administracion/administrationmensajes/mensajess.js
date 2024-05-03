import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import EnviarMensaje from '../../../components/administracionMensajes/EnviarMensaje';
import RecebirMensajes from '../../../components/administracionMensajes/RecebirMensajes'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
 

let scroll = 0;
const Mensajess=() =>{


  const { messagesadminReducer } = useSelector((state) => state);
  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset
      return scroll;
    }
  })

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' })
    }, 100)
  }, [])


  return (
    <div> 
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
       
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Messages administratifs"
              menuVariant="dark"
            >
 
              <NavDropdown.Item href="#action/3.2"> Messages Envoyés</NavDropdown.Item>
           <NavDropdown.Item href="#"> <EnviarMensaje/>  </NavDropdown.Item>
             
            </NavDropdown>
          </Nav>

       
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  <div>
  <div>
 
 <div >
   {messagesadminReducer.result === 0 && (!messagesadminReducer.mensajes?.length || messagesadminReducer.mensajes.length === 0) ? (
     <h2 className="text-center">Aucun message </h2>
   ) : (
     <RecebirMensajes />
   )}
 </div>
</div>
  </div>
</div>



  );
}

export default Mensajess;