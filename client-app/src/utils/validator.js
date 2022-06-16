const validator = (specification, input) => {
  const error = {}

  if(specification === "login") {
    if (!input.email) {
      error.email = 'email is required'
    } else if (!/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(input.email)) {
      error.email = 'email is invalid'
    }

    if (!input.password) {
      error.password = 'password is required'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.password)) {
      error.password = 'Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number'
    }
  }
  else if (specification === "register") {
    
  }


  return error
}

export default validator;
