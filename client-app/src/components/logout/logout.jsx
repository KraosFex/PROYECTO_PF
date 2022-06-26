import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions";
import style from "./logout.module.css";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/");
  };

  return (
    <button onClick={handleClick} className={style.button}>
      {" "}
      logout{" "}
    </button>
  );
};

export default Logout;
