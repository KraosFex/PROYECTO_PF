import style from './userCard.module.css';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUsers } from '../../../../../redux/actions';


function UserCard({id, sname, username, email, isAdmin, image, courses}) {

  const dispatch = useDispatch();

  const popUpFunction = () => {
    console.log("some function not implemented yet")
  }

  const deleteFunction = () => {
    dispatch(deleteUser(id))
    dispatch(getAllUsers());
  }

  const adminFunction = (e) => {
    if(e.target.name === "add_admin") {
        console.log("user is admin")
    } else if(e.target.name === "delete_admin") {
        console.log("user is  admin")
    }
  }

  //SE TENDRIAN QUE CREAR LOS COMPONENETES POPUP PARA LA OPCION DE BANEAR

  return (
    <div className={style.cardContainer}>
      <div className={style.userIdentity}>
        <div className={style.imgContainer}>
          <img src={image} alt="profile"/>
        </div>

        <div className={style.dataContainer}>
          <h1>{username}</h1>
          <h4>{name}</h4>
          <h4>{email}</h4>
          <h4>isAdmin: {isAdmin.toString()}</h4>
        </div>
      </div>
      <div className={style.userCourses}>
        <h2>Courses:</h2>
        <div className={style.coursesContainer}>
          {courses.map(course => (
            <h5 key={course.title}>{course.title}</h5>
          ))}
        </div>
      </div>
      <div className={style.adminOptions}>
        <button className={style.optionButton} onClick={() => popUpFunction()} name="ban">Banear</button>
        <button className={style.optionButton} onClick={() => deleteFunction()} name="delete">Eliminar</button>
        {isAdmin ?
          <button className={style.optionButton} onClick={(e) => adminFunction(e)} name="delete_admin">Quitar Admin</button>
          :
          <button className={style.optionButton} onClick={(e) => adminFunction(e)} name="add_admin">Hacer Admin</button>
        }
      </div>
    </div>
  )
}

export default UserCard;
