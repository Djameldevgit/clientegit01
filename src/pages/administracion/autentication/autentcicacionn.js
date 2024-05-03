import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
 

const Autentcicacionn = () => {
  return (
<Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
       
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Authentification et Activation Compte"
              menuVariant="dark"
            >
                <NavDropdown.Item href="/pages/administracion/autentication/autenticacionemail"> MAuthentification par courrie</NavDropdown.Item>
           <NavDropdown.Item href="/pages/administracion/autentication/activarcuenta">   Activation de compte </NavDropdown.Item>
           <NavDropdown.Item href="/pages/administracion/autentication/contadorr">   Compteur </NavDropdown.Item>
             
            </NavDropdown>
          </Nav>

       
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Autentcicacionn