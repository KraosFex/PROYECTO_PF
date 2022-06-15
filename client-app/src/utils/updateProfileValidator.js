const validator = (specification, input) => {
  const error = {}

if(specification === "username") {
    if (!input.username) {
      error.username = 'username is required'
    }
}


else if (specification === "password") {
  if (!input.newPassword) {
    error.newPassword = 'password is required'
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.newPassword)) {
    error.newPassword = 'Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number'
  }
}

  if (!input.password) {
    error.password = 'password is required'
  }


  return error
}

export default validator;
