import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { NavbarCliente } from "./NavbarCliente";

//Validacion rol cliente

const ClienteAuth = () => {

    //Contexto de sesion
    const { auth } = useAuth();

    //Declaración Location
    const location = useLocation();

    //Función de validación de rol
    function isCliente(){
        if (auth?.rol==="cliente") {
            return true;
        } else {
            return false;
        }
    };

    return(
        isCliente()
            ?<><NavbarCliente /><Outlet /></>
            :<Navigate to="/unauth" state={{ from: location}} replace />
    );
}

export default ClienteAuth;