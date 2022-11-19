import { React } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

export function Unauthorized() {

    //Declaración navigate
    const navigate = useNavigate();

    //Función de boton vovler
    const back = () => navigate("/");

    return (

        <>
            <Container>
                <h1 className="my-4">Acceso no autorizado.</h1>
                
                <Button className="my-2" id="UVolverButton" variant="primary" onClick={back} >
                    Volver
                </Button>
            </Container>
        </>

    )
}