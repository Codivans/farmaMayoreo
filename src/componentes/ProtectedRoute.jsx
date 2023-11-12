import { useAuth } from '../contextos/AuthContext';
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouute = ({children}) => {
    const { usuario } = useAuth();

    if(!usuario){
        return <Navigate to='/sesion'/>
    }

    return <Outlet />
}

