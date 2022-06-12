import { NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/actions";

const Logout = () => {

    const dispatch = useDispatch()

    const handleClick = () => dispatch(logout())

    return(
        <NavLink to='/'><button onClick={() => handleClick }> logout </button></NavLink>
    )
}

export default Logout;