import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserRank } from "../../../../redux/actions/index";

// styles
import style from "./userRank.module.css";

const UserRank = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.reducerCompleto.isLogged);
  const user = useSelector((state) => state.reducerCompleto.user);
  const token = useSelector((state) => state.reducerCompleto.authToken);
  const [userRank, setUserRank] = useState();
  const [errorRank, setErrorRank] = useState({});
  const [frame, setFrame] = useState();

  useEffect(() => {
    if (userRank + 1 === 1) setFrame("img/gold.png");
    if (userRank + 1 === 2) setFrame("img/silver.png");
    if (userRank + 1 === 3) setFrame("img/bronze.png");

    async function axiosReq() {
      const dis = await dispatch(getUserRank({ token, id: user._id }));
      const data = dis.payload;
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
          <img
            src={user.Image}
            alt={user.username}
            className={style.userPicture}
          />
          <img
            src={frame}
            className={style.frame}
            onError={() => "this.style.display='none'"}
          />
        </div>
        <div className={style.userRankContainer}>
          <label>{user.username}</label>
          <div className={style.userRank}>
            <h3> Posicion actual</h3>
            <h1>#{userRank + 1}</h1>
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
