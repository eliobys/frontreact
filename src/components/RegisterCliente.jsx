import { React, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export function RegisterCliente() {
    //Configuración de alertas
    toast.configure();

    //Declaración Navigate
    const navigate = useNavigate();

    //Declaración de referencias para la captura de datos
    const nameRef = useRef();
    const documentRef = useRef();
    const direccionRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    
    //Función de boton iniciar sesion
    const handleIniciarSesion = () => {
        navigate("/login");
    };

    //Funcion principal boton registro
    const handleRegisterUser = () => {

        //Formato y captura de información
        const name = nameRef.current.value;
        const document = documentRef.current.value;
        const direccion = direccionRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        //Fetch
        fetch("http://localhost:8080/clientes/registrar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                name,
                document,
                direccion,
                email,
                password

            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.err) {
                    toast.success("Registrado Satisfactoriamente!\nahora inicia sesion", {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                        hideProgressBar: false
                    });
                } else {

                }
            })
            .catch((error) => console.log(error));
        //Redirección a pagina de ingreso
        navigate("/login");
    };



    return (

        <>
            <Container className="backPanel d-flex justify-content-center align-items-center flex-column my-5">
                <h3 className="mt-3">Registrarse como Cliente</h3>
                <Form >

                    <Form.Group className="mb-3" controlId="RCName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control ref={nameRef} type="text" placeholder="Ingrese el nombre completo"  required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="RCDocument">
                        <Form.Label>Documento</Form.Label>
                        <Form.Control ref={documentRef} type="number" placeholder="ingrese el numero de documento"  required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="RCDireccion">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control ref={direccionRef} type="text" placeholder="Ingrese la direccion"  required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="RCEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control ref={emailRef} type="email" placeholder="Ingrese el email"  required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="RCPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control ref={passwordRef} type="password" placeholder="Ingrese la contraseña"  required/>
                    </Form.Group >

                    <Form.Group className="d-flex mb-3 justify-content-center align-items-center"  >
                        <Button className="submitButton" id="RCButtonRegister" variant="secondary" onClick={handleRegisterUser}>
                            Registrarse
                        </Button>
                    </Form.Group>
                </Form>

                <Container className="d-flex mb-3 justify-content-center flex-wrap" >
                    ¿Ya estás registrado? Inicia sesión aquí!
                    <Container className="d-flex mb-3 justify-content-center">
                        <Button className="link2" variant="secondary" id="RCButtonLogin" onClick={handleIniciarSesion} >
                            Iniciar Sesion
                        </Button>
                    </Container>
                </Container>

            </Container>
        </>

    );
}