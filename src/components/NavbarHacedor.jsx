import { React } from "react";
import { Navbar, Nav, Container} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import '../stylesheets/basicNavbar.css';

export function NavbarHacedor() {
    //Contexto de sesión
    const { setAuth } = useAuth();

    //Declaración Navigate
    const navigate = useNavigate();

    //Función cierre de sesion
    const logout = async () => { 
        setAuth({});
        navigate('/login');
    }

    return (

        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">BeBoldP2P Hacedor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="navLinkCustom mx-1" to="/consultar_servicio">Encontrar Servicios</Link>
                            <Link className="navLinkCustom mx-1" to="/dashboard">Mis Servicios</Link>
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