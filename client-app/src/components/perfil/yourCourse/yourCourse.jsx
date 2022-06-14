import style from './yourCourse.module.css'

const YourCourse = ({coursesAll}) => {
    return(
        <div className={style.container}>
            <div className={style.listDetail}>
                <button className={style.button} onClick={() => handleClick()}> show all </button>
                <button className={style.button} onClick={() => handleClick()}> show favoritos </button>
                <button className={style.button}> completed </button>
            </div>

            <div className={style.containerListYourCourse}>
                <div className={style.list}>
                    {coursesAll}
                </div>
            </div>
        </ div>
    )
}

export default YourCourse;
