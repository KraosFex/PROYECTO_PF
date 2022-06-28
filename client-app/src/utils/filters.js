
//ESTADOS DOS FUNCIONES VAN PARA EL UTILS
export const filter = (allCourses, showedCourses) => {
  const radioInputs = [...document.getElementsByName("progreso")];
  const radioInputsChecked = radioInputs.filter((input) => input.checked === true);
  const inputsCheckbox = [...document.getElementsByName("languages")];
  const inputsCheckboxChecked = inputsCheckbox.filter( (input) => input.checked === true);

  //Hardcodeo para que no se bugee el sorter con el filtro
  const selector = [...document.getElementsByName("votes")];
  selector[0].value = 0;

  if(radioInputsChecked[0].value === "Todos" && !inputsCheckboxChecked.length) {

      return allCourses;

  } else if(radioInputsChecked[0].value === "Todos" && inputsCheckboxChecked.length) {

      const coursesToShow = allCourses.filter( course => {
        for(const input of inputsCheckboxChecked) {
          if(input.value === course.lenguaje) return true;
        }
      })
      return coursesToShow


  } else if(radioInputsChecked[0].value === "En progreso" && !inputsCheckboxChecked.length) {

    const coursesToShow = allCourses.filter( courses => {
      for(const userCourse of user.courses) {
        if(course.titulo === userCourse.titulo) return true;
      }
    })
    return coursesToShow

  } else if(trueInputsR[0].value === "En progreso" && inputsCheckboxChecked.length) {

    const someCoursesToShow = allCourses.filter( course => {
      for(const input of inputsCheckboxChecked) {
        if(input.value === course.lenguaje) return true;
      }
    })
    const allCoursesToShow = someCoursesToShow.filter( courses => {
      for(const userCourse of user.courses) {
        if(course.titulo === userCourse.titulo) return true;
      }
    })
  return coursesToShow

  }

}
