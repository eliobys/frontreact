import { React, useRef, useState } from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";

export function ConsultHacedor() {

    //Estados
    const [match, setMatch] = useState([]);                    //Almacena los datos a imprimir
    const [idState, setIdState] = useState(false);
    const [emailState, setEmailState] = useState(true);
    const [documentState, setDocumentState] = useState(true);
    const [criteria, setCriteria] = useState("id");            //Define el criterio de busqueda

    //Referencias
    const idRef = useRef();
    const emailRef = useRef();
    const documentRef = useRef();

    //Renderizado de vistas segun criterio de busqueda
    const handleIdShow = () => {
        setIdState(false);
        setEmailState(true);
        setDocumentState(true);
        setCriteria("id");
    };

    const handleEmailShow = () => {
        setIdState(true);
        setEmailState(false);
        setDocumentState(true);
        setCriteria("email");
    };

    const handleDocumentShow = () => {
        setIdState(true);
        setEmailState(true);
        setDocumentState(false);
        setCriteria("document");
    };

    //Funcion principal consultar
    const handleConsult = () => {

        //Captura y formato de informacion
        const id = idRef.current.value;
        const document = documentRef.current.value;
        const email = emailRef.current.value;
        var payload = "";

        if (criteria === "id") {
            payload = JSON.stringify({
                id
            })
        } else if (criteria === "document") {
            payload = JSON.stringify({
                document
            })
        } else if (criteria === "email") {
            payload = JSON.stringify({
                email
            })
        }

        //Fetch
        fetch("http://localhost:8080/hacedor/consultar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: payload,
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.err) {
                    setMatch([response]); //Captura de datos a imprimir
                } else {

                }
            })
            .catch((error) => console.log(error));

    };

    return (

        <>
            <Container className="my-2">
                <h3>Ingrese el dato de busqueda:</h3>
                <Form>
                    <Container>
                        <Form.Group className="mb-3" controlId="CHStateCheck" >
                            <Form.Check
                                defaultChecked
                                inline
                                label="ID de hacedor"
                                name="group1"
                                type="radio"
                                value="id"
                                onChange={handleIdShow}
                            />
                            <Form.Check
                                inline
                                label="Email"
                                name="group1"
                                type="radio"
                                value="email"
                                onChange={handleEmailShow}
                            />
                            <Form.Check
                                inline
                                label="Documento"
                                name="group1"
                                type="radio"
                                value="document"
                                onChange={handleDocumentShow}
                            />
                        </Form.Group>
                    </Container>

                    <Form.Group className="mb-3" controlId="CHId" hidden={idState} >
                        <Form.Label>Numero de Identificacion: </Form.Label>
                        <Form.Control ref={idRef} type="number" placeholder="Ingrese el id unico" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="CHDocument" hidden={documentState} >
                        <Form.Label >
                            Documento
                        </Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Text>C.C.</InputGroup.Text>
                            <Form.Control ref={documentRef} type="number" placeholder="Ingrese el documento" />
                        </InputGroup>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="CHEmail" hidden={emailState}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control ref={emailRef} type="email" placeholder="Ingrese el email" />
                    </Form.Group>

                    <Button onClick={handleConsult} id="CHBuscarButton" variant="primary">
                        Buscar Coincidencia
                    </Button>
                </Form>

                <Container className="my-3 bg-secondary">
                    <h5>Datos: </h5>
                    {
                        match.map((item) => {
                            return (
                                <p key={item}>
                                    ID de hacedor: {item.id} <br />
                                    Nombre: {item.name} <br />
                                    Email: {item.email} <br />
                                    Trabajo Principal: {item.job} <br />
                                    Area de trabajo: {item.workrange}

                                </p>
                            )
                        })
                    }
                </Container>

            </Container>

        </>

    )
}