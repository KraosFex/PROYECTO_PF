import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserRank } from "../../../../redux/actions";

// styles
import style from "./userRank.module.css";

const UserRank = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((store) => store.isLogged);
  const user = useSelector((store) => store.user);
  const [userRank, setUserRank] = useState();
  const [errorRank, setErrorRank] = useState({});

  useEffect(() => {
    async function axiosReq() {
      const data = await dispatch(getUserRank(user._id));
      if (data.success) {
        setUserRank(data.response);
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
          <img src={user.Image} alt={user.username} />
        </div>
        <div className={style.userRankContainer}>
          <label>Tu rango actual es:</label>
          <h1 className={style.userRank}>#{userRank}</h1>
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
