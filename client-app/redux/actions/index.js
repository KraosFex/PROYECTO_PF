// actions reducer  
export function createNew(input) {
    return async function (dispatch) {
      await axios.post("localhost:27017/api/users/", input)
        .then(resp => resp.data)
        .then(respuesta => dispatch({
          type: "POST_NEW_USER",
          payload: respuesta,
        })).catch((err) => {
          console.log(err);
          alert("Ups! Something went wrong...");
        });
    }
  };