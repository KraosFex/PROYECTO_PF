import style from "./usersPage.module.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../../redux/actions';
import UserCard from './userCard/userCard';

function UserPage() {

const dispatch = useDispatch();

const showedUsers = useSelector(store => store.showedUsers);


useEffect(() => {

  dispatch(getAllUsers());

}, [dispatch])

  return (
  <div className={style.highContainer}>
    {/*INPUT SEARCH CREADO POR SAMIR*/}
    {showedUsers.map(user => (
      <UserCard name={user.name} username={user.username} email={user.email} isAdmin={user.isAdmin} image={user.image} courses={user.courses}/>
    ))}
  </div>
  )
}

export default UserPage;
