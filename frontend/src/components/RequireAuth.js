import { useLocation, Navigate, Outlet ,useOutletContext} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
    const { auth } = useAuth();
    const location = useLocation();
    
     console.log(auth);
     console.log(auth.is_staff)
     console.log(allowedRoles)
     
     const userRoles = auth.is_staff ? [
        'User' , 'Admin', 'student', 'teacher'
     ] : [
        'User'
    ];
    console.log(userRoles);
   
   

    return (
        userRoles?.find(role => allowedRoles?.includes(role))
            ? <Outlet context={[animationIsFinished, setAnimationIsFinished]} />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;