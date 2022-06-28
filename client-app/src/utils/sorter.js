export const sortByRating = (e, showedCourses) => {
  let tempArr = showedCourses;

  if(e.target.value === "1"){
    tempArr.sort((a, b) => {
      return b.calificacion - a.calificacion;
    });
  } else if (e.target.value === "2") {
    tempArr.sort((a, b) => {
      return a.calificacion - b.calificacion;
    });
  } else {
    return showedCourses;
  }

  return tempArr

}
