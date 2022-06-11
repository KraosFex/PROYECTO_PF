// actions reducer
// actions reducer
import axios from 'axios'

export function createNew (input) {
  return async function (dispatch) {
    try {
      const metaData = await axios.post('http://localhost:3001/api/users', input)
      dispatch({type: 'POST_NEW_USER', payload: respuesta})
    } catch(err) {
      console.log(err)
      alert('Ups! Something went wrong...')
    }
 }
}

export function setShowedCourses (courses) {
    return {
      type: "SET_SHOWEDCOURSES",
      payload: courses
    };
  };


export function setCourses (courses) {
    return {
      type: "SET_COURSES",
      payload: courses
    };
  };


export function getCourses () {
  return async function (dispatch) {
     const metaData = await axios.get('http://localhost:3001/api/cursos')
     dispatch(setCourses(metaData.data));
     dispatch(setShowedCourses(metaData.data));
  };
};


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
