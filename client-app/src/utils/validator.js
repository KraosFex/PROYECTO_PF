const validator = (specification, input) => {
<<<<<<< HEAD
  const error = {};

  if (specification === "login") {
    if (!input.email) {
      error.email = "Email requerido";
    } else if (
      !/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(input.email)
    ) {
      error.email = "Email invalido";
    }

    if (!input.password) {
      error.password = "Contraseña requerida";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.password)
    ) {
      error.password =
        "Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número";
    }
  } else if (specification === "register") {
    if (!input.name) {
      error.name = "Nombre requerido";
    } else if (!/[\w ]$/.test(input.name)) {
      error.name = "Nombre invalido";
    }

    if (!input.username) {
      error.username = "Usuario requerido";
    } else if (!/[\w $&#@]$/.test(input.username)) {
      error.username =
        "Usuario inválido. Solo estos caracteres especiales están permitidos: [$ & # @]";
    }

    if (!input.email) {
      error.email = "Email requerido";
    } else if (
      !/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(input.email)
    ) {
      error.email = "Email invalido";
    }

    if (!input.password) {
      error.password = "Contraseña requerida";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.password)
    ) {
      error.password =
        "Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número";
    }

    if (!input.confirmPassword) {
      error.confirmPassword = "Contraseña requerida";
    } else if (input.confirmPassword !== input.password) {
      error.confirmPassword = "La contraseña no coincide";
    }
  }

  return error;
};
=======
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

    if (!input.name) {
      error.name = 'name is required'
    } else if (!/[\w ]$/.test(input.name)) {
      error.name = 'name is invalid'
    }

    if (!input.username) {
      error.username = 'username is required'
    } else if (!/[\w $&#@]$/.test(input.username)) {
      error.username = 'username is invalid. Only these special characters [$ & # @] are allowed'
    }

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

    if(!input.confirmPassword) {
      error.confirmPassword = "password is required"
    } else if(input.confirmPassword !== input.password) {
      error.confirmPassword = "Passwords dont match"
    }

  }


  return error
}
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf

export default validator;
