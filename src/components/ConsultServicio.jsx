import { React, useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Badge, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";


export function ConsultServicio() {
    //Configuración de alertas
    toast.configure();

    //Contexto de sesion
    const { auth } = useAuth();

    //Estados
    const [services, setServices] = useState([]);
    const [user, setUser] = useState();
    const [dashboard, setDashboard] = useState(    //El estado se setea con valores default para evitar exepciones.
        {
            "type": "",
            "descryption": "",
            "value": "",
            "cliente": {
                "name": "",
                "document": "",
                "direccion": "",
                "email": "",
                "password": "",
                "id": 0
            },
            "hacedor": "",
            "status": "",
            "id": 0
        }
    );

    //Captura de constante
    const id = auth.userid;

    //Solicitud de datos para el menú
    useEffect(() => {
        fetch("http://localhost:8080/servicios/emparejar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                hacedor: id
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.err) {
                    setServices(response);

                } else {

                }
            })
            .catch((error) => console.log(error));
    }, []);


    //Función para definir el renderizado de la selección del usuario
    const handleOpenDashboard = (cache => param => {
        const renderId = param;
        if (!cache[param])
            cache[param] = e =>

                fetch("http://localhost:8080/servicios/especifico", {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({
                        type: renderId
                    }),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (!response.err) {
                            setDashboard(response); //Definición de selección
                            getUserData();          //Solicitud de datos del hacedor
                        } else {

                        }
                    })
                    .catch((error) => console.log(error));

        return cache[param];
    }
    )({});

    //Funcion para solicitar los datos del hacedor
    const getUserData = () => {

        //Captura de datos desde el contexto
        const email = auth?.user;
        const password = auth?.pwd;

        fetch("http://localhost:8080/hacedor/ingresar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.err) {
                    setUser(response);
                } else {

                }
            })
            .catch((error) => console.log(error));
    };

    //Funcion principal aceptar servicio
    const handleAcceptService = async () => {

        var payload = "";
        const type = dashboard.type;
        const descryption = dashboard.descryption;
        const value = dashboard.value;
        const cliente = dashboard.cliente;
        const id = dashboard.id;

        const status = "matched";
        const hacedor = user;

        payload = JSON.stringify({
            id,
            type,
            descryption,
            value,
            status,
            cliente,
            hacedor
        })


        fetch("http://localhost:8080/servicios/solicitar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: payload
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.err) {
                    toast.success("Servicio aceptado de forma correcta id: " + id, {
                        position: "top-right",
                        autoClose: 5000,
                        closeOnClick: true,
                        draggable: true,
                        hideProgressBar: false
                    });
                } else {

                }
            })
            .catch((error) => console.log(error));

    };

    //Funcion de renderizado de seleccion
    const Print = () => {

        //Captura de seleccion
        const data = dashboard;

        return (
            <Card>
                <Card.Header as="h5"> Servicio </Card.Header>
                {<Card.Body>
                    <Card.Title> <h4>{data.type}</h4>  </Card.Title>
                    <Card.Text as="div">
                        <h5>Descripcion: </h5>
                        {data.descryption}<br />
                        <h5>Datos del cliente: </h5>
                        ID de Cliente: {data.cliente.id} <br />
                        Nombre: {data.cliente.name} <br />
                        Direccion: {data.cliente.direccion} <br />
                        Email: {data.cliente.email}

                    </Card.Text>
                    <Button variant="primary" onClick={handleAcceptService} >Aceptar Servicio</Button>
                </Card.Body>}
            </Card>
        );
    };

    return (

        <>
            <Container>
                <Container className="d-flex justify-content-center align-items-center flex-row my-2">
                    <h1>Solicitar Servicio</h1>
                </Container>
                <Row className="backPanel d-flex justify-content-center align-items-center flex-row my-5">
                    <Col sm={4}>
                        <ListGroup as="ol" numbered>
                            {
                                services.map((item) => {         //recorro el state y muestro datos
                                    return (

                                        <ListGroup.Item
                                            action
                                            key={item.id}
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                            onClick={handleOpenDashboard(item.id)}
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{item.type}</div>
                                                {item.descryption}
                                            </div>
                                            <Badge bg="primary" pill>
                                                $
                                                {item.value}
                                            </Badge>
                                        </ListGroup.Item>

                                    );
                                })}
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Print></Print>
                    </Col>
                </Row>
            </Container>
        </>

    );
}