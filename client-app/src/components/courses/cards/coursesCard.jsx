import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import CompletedIcon from '../../../icons/completedicon'
import FavoriteIcon from '../../../icons/Favorite'
import JSIcon from '../../../icons/javascript'
import darkTheme from './coursesCardDark.module.css'
import lightTheme from './coursesCardLight.module.css'

let style = darkTheme

function CoursesCard ({ courses }) {


  const theme = useSelector((store) => store.theme)

  return (
          <div>
            {courses.map((p) => (
              <ThemeProvider
                theme={theme === 'light' ? (style = lightTheme) : (style = darkTheme)}
                key={p.titulo}
                >
                      <div className={style.containerCourse}>
                        <div className={style.flexContainer}>
                          <h3 className={style.courseName}>{p.titulo}</h3>
                          <div className={style.courseStats}>
                            <FavoriteIcon />
                            <span>{p.calificacion}</span>
                            <CompletedIcon />
                            <span>1600</span>
                          </div>
                          <div className={style.descripcion}>
                            <span>{p.descripcion}</span>
                          </div>
                        </div>
                        <div className={style.lenguaje}>
                          <JSIcon lenguajes={p.lenguaje} />
                        </div>
                      </div>
              </ThemeProvider>
              ))
            }
          </div>
      )
}

export default CoursesCard
