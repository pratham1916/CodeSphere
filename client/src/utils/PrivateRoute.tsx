import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }:any) => {
    const isAuth = (localStorage.getItem("token") && localStorage.getItem("userId"))
    return isAuth ? children : <Navigate to="/signin" replace />;
}

export default PrivateRoute;
