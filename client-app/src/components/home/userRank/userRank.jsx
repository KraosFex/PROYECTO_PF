import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserRank } from "../../../../redux/actions/index";

// styles
import style from "./userRank.module.css";
import { setRankBorder } from "../../../../redux/reducer";

const UserRank = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.reducerCompleto.isLogged);
  const user = useSelector((state) => state.reducerCompleto.user);
  const { rankBorder } = useSelector((state) => state.reducerCompleto);
  const token = useSelector((state) => state.reducerCompleto.authToken);
  const [userRank, setUserRank] = useState();
  const [errorRank, setErrorRank] = useState({});

  if (userRank === 1) dispatch(setRankBorder("img/gold.png"));
  else if (userRank === 2) dispatch(setRankBorder("img/silver.png"));
  else if (userRank === 3) dispatch(setRankBorder("img/bronze.png"));
  else if (userRank > 3 || userRank <= 0) dispatch(setRankBorder(""));

  useEffect(() => {
    async function axiosReq() {
      const dis = await dispatch(getUserRank({ token, id: user._id }));
      const data = dis.payload;
      if (data.success) {
        setUserRank(data.response + 1);
        console.log(rankBorder);
      } else {
        setErrorRank({ err: data.info });
      }
    }
    if (isLogged) {
      axiosReq();
    }
  }, [dispatch]);

  if (isLogged) {
    return (
      <div className={style.flexContainer}>
        <div className={style.imgContainer}>
          <img
            src={user.Image}
            alt={user.username}
            className={style.userPicture}
          />
          <img
            src={rankBorder}
            className={style.frame}
            onError={() => "this.style.display='none'"}
          />
        </div>
        <div className={style.userRankContainer}>
          <label>{user.username}</label>
          <div className={userRank <= 0 ? style.userNotRanked : style.userRank}>
            <h3> Posicion actual</h3>
            <h1>{userRank <= 0 ? "Not Ranked" : "#" + userRank}</h1>
          </div>
          {errorRank.err && (
            <label className={style.err}>{errorRank.err}</label>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default UserRank;
