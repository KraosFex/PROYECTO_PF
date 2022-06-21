import style from "./userRank.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
//import { getUserRank } from '../../../../redux/actions';

const UserRank = () => {

  const dispatch = useDispatch();
  const isLogged = useSelector((store) => store.isLogged);
  const user = useSelector((store) => store.user)
  const [userRank, setUserRank] = useState()

  //  TODAVIA NO ESTA IMPLEMENTADO LA ACTION EN EL REDUX

  /*useEffect(() => {
    async function axiosReq() {
      const rank = await dispatch(getUserRank(user._id))
      setUserRank(rank);
    }

    if(isLogged) {
      axiosReq();
    }
  }, [dispatch]);*/

  if(isLogged) {
    return (
      <div className={style.userRankContainer}>
        <label>Your Actual Rank Is:</label>
        <div className={style.imgContainer}>
        <img src={user.Image} alt={user.username} />
        </div>
        <h1 className={style.userRank}>{userRank}#</h1>
      </div>
    )
  } else {
    return (
      <></>
    )
  }


}

export default UserRank;
