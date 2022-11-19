import { React } from "react";
import { Navbar, Nav, Container} from "react-bootstrap";
import { useNavigate, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import '../stylesheets/basicNavbar.css';

export function NavbarCliente() {
    //Contexto de sesion
    const { setAuth } = useAuth();

    //Declaración navigate
    const navigate = useNavigate();

    //Funcion cierre de sesión
    const logout = async () => { 
        setAuth({});
        navigate('/login');
    }

    return (

        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">BeBoldP2P Cliente</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="navLinkCustom mx-1" to="/consultar_hacedor">Detalles de hacedor</Link>
                            <Link className="navLinkCustom mx-1" to="/solicitar_servicio">Solicitar Servicio</Link>
                        </Nav>
                        <Nav>
                        <Nav.Link onClick={logout} href="#logout">
                            Cerrar Sesion
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
}