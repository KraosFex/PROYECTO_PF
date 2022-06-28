//libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '@mui/material/Pagination';

// actions redux
import { getAllUsers } from "../../../../redux/actions";

// components
import UserCard from "./userCard/userCard.jsx";
import SearchProfiles from "./searchProfiles/searchProfiles";

// style
import style from "./usersPage.module.css";

function UserPage() {

  const [ page, setPage ] = useState(1);


  //Forcing the re-render
  const [ refresh, setRefresh ] = useState(true)

  const dispatch = useDispatch();

  const showedUsers = useSelector((store) => store.showedUsers);
  const actualUser = useSelector((store) => store.user);
  const paginateObj = useSelector((store) => store.paginateUsers);

   // Este Handle es el paginado
  const handleChange = async (e, value) => {
    await setPage(value);
    await dispatch(getAllUsers(value))
    refresh? setRefresh(false) : setRefresh(true);
  };

useEffect(() => {
  dispatch(getAllUsers(page))
}, [dispatch])



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
        <div>
          <Pagination count={paginateObj.totalPages} page={page} onChange={handleChange} variant="outlined" color="secondary" />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
