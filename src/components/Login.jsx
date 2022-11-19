import { useRef, useState, useEffect} from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import '../stylesheets/basicLoginRegister.css';

import axios from '../api/axios';

import { Form, Button, Container, Row, Col, Stack } from "react-bootstrap";

const LOGIN_URL = '/ingresar';

const Login = () => {
    //Contexto Login
    const { setAuth } = useAuth();

    //Declaraciones Navigate
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    //Referencias y estados para la captura y muestra de datos.
    const userRef = useRef();
    const errRef = useRef();
    const rolRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    //Funciones de los botones de registro
    const handleRegisterCliente = () => {
        navigate('/register_cliente', { replace: true })
    };

    const handleRegisterHacedor = () => {
        navigate('/register_hacedor', { replace: true })
    };

    //Funcion principal boton ingresar
    const handleSubmit = async (e) => {
        e.preventDefault();
        const rol = rolRef.current.value;

        try {
            //Fetch
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: user, password: pwd, rol }),
                {
                    headers: { 'Content-Type': 'application/json' }
                });
            
            //Captura de datos de la respuesta
            const status = response?.data?.status;
            const userid = response?.data?.id;
            
            //Validación de datos recibidos
            if (status === "valid") {
                setAuth({ user, pwd, rol, userid });
                setUser('');
                setPwd('');
                navigate(from, { replace: true });
            } else if (status === "invalid_user") {
                setErrMsg('El correo ingresado es invalido.');
                errRef.current.focus();
            } else if (status === "invalid_password") {
                setErrMsg('La constraseña ingresada es invalida.');
                errRef.current.focus();
            } else if (status === "invalid_rol") {
                setErrMsg('El rol ingresada es invalido.');
                errRef.current.focus();
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing data.');
            } else if (err.response?.status === 401) {
                setErrMsg('unauth.');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();

        }
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <Row
                    className="d-inline-flex flex-column flex-lg-row flex-fill my-2 mx-lg-5 align-items-center"
                >
                    <Col className="d-flex light justify-content-center">
                        <h1 className="font-weight-bold display-2 pb-lg-5 text-center">
                            INGRESAR
                        </h1>
                    </Col>
                    <Col
                        xs={{ order: "last" }}
                        className="d-flex my-5 mx-lg-5 justify-content-center">

                        <Container>
                            <div>
                                <Container className="d-inline-flex pt-lg-5 align-items-center">
                                </Container>
                                <Container className="backPanel d-flex pt-4 px-lg-5 flex-column">
                                    <Container>
                                        <Form onSubmit={handleSubmit}>
                                            <Stack
                                                gap={4}
                                                className="d-flex pb-3 border-bottom border-light border-3"
                                            >

                                                <p ref={errRef} className={errMsg ? "errorNotification" : "offscreen"} aria-live="assertive"> {errMsg} </p>

                                                <Form.Group>
                                                    <Form.Label htmlFor="rolInput">Rol</Form.Label>
                                                    <Form.Select className="form-control" ref={rolRef} defaultValue="norol" id="rolInput">
                                                        <option disabled value="norol">Seleccione su rol...</option>
                                                        <option value="cliente">Cliente</option>
                                                        <option value="hacedor">Hacedor</option>

                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label htmlFor="emailInput">E-mail</Form.Label>
                                                    <Form.Control
                                                        className=""
                                                        id="emailInput"
                                                        ref={userRef}
                                                        type="email"
                                                        placeholder="Ingrese el E-mail"
                                                        autoComplete="off"
                                                        onChange={(e) => setUser(e.target.value)}
                                                        value={user}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label htmlFor="passwordInput">Contraseña</Form.Label>
                                                    <Form.Control
                                                        className=""
                                                        id="passwordInput"
                                                        type="password"
                                                        placeholder="Ingrese la Contraseña"
                                                        autoComplete="off"
                                                        onChange={(e) => setPwd(e.target.value)}
                                                        value={pwd}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Form.Group className="d-flex justify-content-center align-items-center form-control-lg">
                                                    <Button className="submitButton" id="submitButton" variant="primary" type="submit" >
                                                        Ingresar
                                                    </Button>
                                                </Form.Group>
                                            </Stack>
                                        </Form>
                                    </Container>
                                    <Container className="d-flex mb-3 justify-content-center flex-wrap" >
                                        ¿No te has registrado aun? Registrate aquí!
                                        <Container className="d-flex mb-3 justify-content-between">
                                            <Button className="link2" id="registerClienteButton" variant="secondary" onClick={handleRegisterCliente} >
                                                Como Cliente
                                            </Button>

                                            <Button className="link2" id="registerHacedorButton" variant="secondary" onClick={handleRegisterHacedor} >
                                                Como Hacedor
                                            </Button>
                                        </Container>
                                    </Container>
                                </Container>
                            </div>
                        </Container>

                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Login;