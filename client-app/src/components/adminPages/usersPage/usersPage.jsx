import style from "./usersPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/actions/index";
import UserCard from "./userCard/userCard.jsx";
import SearchProfiles from "./searchProfiles/searchProfiles";
import Pagination from "@mui/material/Pagination";

function UserPage() {
  const dispatch = useDispatch();

  const showedUsers = useSelector((state) => state.reducerCompleto.showedUsers);
  const actualUser = useSelector((state) => state.reducerCompleto.user);
  const token = useSelector((state) => state.reducerCompleto.authToken);
  const paginateObj = useSelector(
    (state) => state.reducerCompleto.paginateUsers
  );
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers({ token, page }));
  }, [dispatch]);

  const handleChange = async (e, value) => {
    await setPage(value);
    await dispatch(getAllUsers({ token, page: value }));
    refresh ? setRefresh(false) : setRefresh(true);
  };

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
                premium={user.isPremium}
                image={user.Image}
                courses={user.courses}
              />
            );
          }
        })}
        <div>
          <Pagination
            count={paginateObj.totalPages}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
