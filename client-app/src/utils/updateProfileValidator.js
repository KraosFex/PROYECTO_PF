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


else if (specification === "URL") {
  if (!input.URL) {
    error.URL = 'URL is required'
  } else if (!/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(input.URL)) {
    error.URL = 'URL is invalid'
  }
}






  return error
}

export default validator;
