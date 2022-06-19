import { Navigate, Outlet } from "react-router-dom";

<<<<<<< HEAD
const PrivateRoute = ({ isLogged }) => {
  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};
=======
const PrivateRoute = ( {isLogged} ) => {

    return isLogged? <Outlet /> : <Navigate to='/login' />

}
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf

export default PrivateRoute;
