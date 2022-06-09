// actions reducer  
import axios from "axios"
export async function createNew(input) {
  let newinput = { name: input.name, password: input.password, email: input.email }
  let errores = await axios.post("/api/users", newinput)
    .then(resp => resp.data).then((a) => { ; return { good: a.info } })
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