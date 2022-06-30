export const lenguaje = (type, type2, type3, array) => {
  if (array.length)
    return array.filter(
      (p) => p.lenguaje === type || p.lenguaje === type2 || p.lenguaje === type3
    );
  return [];
};

const createCalification = (course) => {
  if (course.votes && course.votes.length) {
    let calification = 0;
    for (const vote of course.votes) {
      calification += vote;
    }
    return Number((calification / course.votes.length).toFixed(1));
  } else {
    return 0;
  }
};

export const ordered = (order, array) => {
  var votos = array.map((o) => createCalification(o));
  var orde = [];
  switch (order) {
    case "MasVotados":
      votos = votos.sort((a, b) => b - a);
      votos.forEach((f) => {
        array.forEach((p) => {
          if (createCalification(p) === f) orde.push(p);
        });
      });
      orde = orde.filter((e, i) => orde.indexOf(e) === i);
      return orde;
    case "MenosVotados":
      votos = votos.sort((a, b) => a - b);
      votos.forEach((f) => {
        array.forEach((p) => {
          if (createCalification(p) === f) orde.push(p);
        });
      });
      orde = orde.filter((e, i) => orde.indexOf(e) === i);
      return orde;
    default:
      return array;
  }
};
