import style from "./usersPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/actions";
import UserCard from "./userCard/userCard";
import SearchProfiles from "./searchProfiles/searchProfiles";

function UserPage() {
  const dispatch = useDispatch();

  const showedUsers = useSelector((store) => store.showedUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className={style.highContainer}>
      <SearchProfiles />
      {showedUsers.map((user) => (
        <UserCard
          id={user._id}
          name={user.name}
          username={user.username}
          email={user.email}
          isAdmin={user.isAdmin}
          image={user.Image}
          courses={user.courses}
        />
      ))}
    </div>
  );
}

export default UserPage;
