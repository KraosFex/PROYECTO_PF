export default function validator(specification, input) {
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

