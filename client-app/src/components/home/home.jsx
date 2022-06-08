import Article from "./article/article";
import Aside from  "./aside/aside";
import Profile from  "./profile/profile";
import style from "./home.module.css";



function Home() {
  return (
    <div className={style.home}>
      <Profile />
      <Aside />
      <Article />
    </div>
  );
}

export default Home;
