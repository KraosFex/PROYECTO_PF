import style from "./usersPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/actions/index";
import UserCard from "./userCard/userCard.jsx";
import SearchProfiles from "./searchProfiles/searchProfiles";

function UserPage() {
  const dispatch = useDispatch();

  const showedUsers = useSelector((state) => state.reducerCompleto.showedUsers);
  const actualUser = useSelector((state) => state.reducerCompleto.user);
  const token = useSelector((state) => state.reducerCompleto.authToken);

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [dispatch]);

  return (
    <div className={style.flexContainer}>
      <div className={style.highContainer}>
        <SearchProfiles />
        {showedUsers.map((user) => {
          if (actualUser._id !== user._id) {
            return (
              <UserCard
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
