import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { NavbarHacedor } from "./NavbarHacedor";

//Validación rol hacedor

const HacedorAuth = () => {

    //Contexto de sesión
    const { auth } = useAuth();

    //Declaración Location
    const location = useLocation();

    //Funcion de validacion de rol
    function isHacedor(){
        if (auth?.rol==="hacedor") {
            return true;
        } else {
            return false;
        }
    };

    return(
        isHacedor()
            ?<><NavbarHacedor /><Outlet /></>
            :<Navigate to="/unauth" state={{ from: location}} replace />
    );
}

export default HacedorAuth;