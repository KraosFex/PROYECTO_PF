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
  const [ totalPages, setTotalPages ] =  useState(0)

  const dispatch = useDispatch();

  const showedUsers = useSelector((store) => store.showedUsers);
  const actualUser = useSelector((store) => store.user);

   // Este Handle es el paginado
  const handleChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    const axiosReq = async () => {
      const data = await dispatch(getAllUsers(page))
      setTotalPages(data.totalPages)
    }
    axiosReq()
  }, [dispatch])

  return (
    <div className={style.flexContainer}>
      <div className={style.highContainer}>
        <SearchProfiles />
        {showedUsers.docs.map((user) => {
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
          <Pagination count={totalPages} page={page} onChange={handleChange} variant="outlined" color="secondary" />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
