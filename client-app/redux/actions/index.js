// actions reducer
// actions reducer
import axios from 'axios'

export function createNew (input) {
  return async function (dispatch) {
    await axios
      .post('http://localhost:27017/api/users/', input)
      .then((resp) => resp.data)
      .then((respuesta) =>
        dispatch({
          type: 'POST_NEW_USER',
          payload: respuesta
        })
      )
      .catch((err) => {
        console.log(err)
        alert('Ups! Something went wrong...')
      })
  }
}
export function getCourses () {
  return async function (dispatch) {
    await axios
      .get('http://localhost:3001/api/cursos')
      .then((resp) => resp.data)
      .then((respuesta) =>
        dispatch({
          type: 'GET_COURSES',
          payload: respuesta
        })
      )
  }
}
export function getCourseByName (name) {
  return async function (dispatch) {
    await axios
      .get(`http://localhost:3001/api/cursos/${name}`)
      .then((resp) => resp.data)
      .then((respuesta) =>
        dispatch({
          type: 'GET_COURSEBYNAME',
          payload: respuesta
        })
      )
      .catch((err) => {
        console.log(err)
        alert('Ups! Something went wrong...')
      })
  }
}
