import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ( {isLoger} ) => {
    return isLoger === true ? <Outlet /> : <Navigate to='/Login' />
}

export default PrivateRoute;