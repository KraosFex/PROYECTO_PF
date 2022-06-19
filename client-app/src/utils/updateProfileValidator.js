const validator = (specification, input) => {
  const error = {}

if(specification === "username") {
    if (!input.username) {
      error.username = 'username is required'
    }
}


else if (specification === "email") {
  if (!input.email) {
    error.email = 'email is required'
  } else if (!/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(input.email)) {
    error.email = 'email is invalid'
  }
}




  return error
}

export default validator;
