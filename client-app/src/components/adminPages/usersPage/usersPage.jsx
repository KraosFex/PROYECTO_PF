import style from "./usersPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/actions";
import UserCard from "./userCard/userCard.jsx";
import SearchProfiles from "./searchProfiles/searchProfiles";

function UserPage() {
  const dispatch = useDispatch();

  const showedUsers = useSelector((store) => store.showedUsers);
  const actualUser = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className={style.flexContainer}>
      <div className={style.highContainer}>
        <SearchProfiles />
        {showedUsers.map((user) => {
          if (actualUser._id !== user._id) {
            return (
              <UserCard
                estado={user.estado}
                key={user._id}
                id={user._id}
                name={user.name}
                username={user.username}
                email={user.email}
                isAdmin={user.isAdmin}
                image={user.Image}
                courses={user.courses}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default UserPage;
