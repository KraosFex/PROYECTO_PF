import React from "react";
import { Link } from "react-router-dom";
import style from "../../styles/Navbar/navbarUser.module.css";
import FavoriteIcon from "../icons/Favorite";
import Notification from "../icons/notification";
import UserIcon from "../icons/User";

function NavBarUser() {
  return (
    <div className={style.container}>
      <div className={style.icon21}>
        <Link to="#">
          <FavoriteIcon />
        </Link>
      </div>
      <div className={style.icon2}>
        <Link to="#">
          <Notification />
        </Link>
      </div>
      <div className={style.icon2}>
        <Link to="#">
          <UserIcon />
        </Link>
      </div>
    </div>
  );
}

export default NavBarUser;
