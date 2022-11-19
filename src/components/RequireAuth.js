import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

//Validación sesión inciada

const RequireAuth = () => {
    //Contexto de sesión
    const { auth } = useAuth();

    //Declaración Location
    const location = useLocation();

    return(
        auth?.user
            ?<Outlet />
            :<Navigate to="/login" state={{ from: location}} replace />
    );
}

export default RequireAuth;