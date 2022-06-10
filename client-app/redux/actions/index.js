// actions reducer
// actions reducer
import axios from "axios";

export async function createNew(input) {
  let newinput = { name: input.name, password: input.password, email: input.email, imagen: input.Image==="" || !input.Image ? "https://img2.freepng.es/20180323/pww/kisspng-computer-icons-clip-art-profile-cliparts-free-5ab5a47b02ff75.0880050915218535630123.jpg": input.Image}
  console.log(newinput)
  let errores = await axios.post("/api/users", newinput)
    .then(resp => resp.data).then((a) => { return { good: a.info } })
    .catch((err) => {
      return ({ password: err.response.data });
    });
  return (errores);

};

export function FindCourse(id) {
  return async function(dispatch){
    await axios.get(`/api/cursos/${id}`).then(resp => resp.data)
    .then((resp)=>dispatch({type:"GET_CURSE", payload: resp}))
  }
};

export function getCourses() {
  return async function (dispatch) {
    await axios
      .get("/api/cursos")
      .then((resp) => resp.data)
      .then((respuesta) =>
        dispatch({
          type: "GET_COURSES",
          payload: respuesta,
        })
      );
  };
}
export function getCourseByName(name) {
  return async function (dispatch) {
    await axios
      .get(`/api/cursos/${name}`)
      .then((resp) => resp.data)
      .then((respuesta) =>
        dispatch({
          type: "GET_COURSEBYNAME",
          payload: respuesta,
        })
      )
      .catch((err) => {
        console.log(err);
        alert("Ups! Something went wrong...");
      });
  };
}
