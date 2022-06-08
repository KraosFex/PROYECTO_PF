// actions reducer  
import axios from "axios"
export async function createNew(input) {
  let newinput = { name: input.name, password: input.password, email: input.email }
  let errores = await axios.post("http://localhost:3001/api/users", newinput)
    .then(resp => resp.data).then((a) => { ; return { good: a.info } })
    .catch((err) => {
      console.log(err.response.data)
      return ({ password: err.response.data });
    });
  return (errores);

};