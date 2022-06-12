import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const PrivateRoute = ( {isLogged} ) => {

    return isLogged? <Outlet /> : <Navigate to='/Login' />
}

export default PrivateRoute;
