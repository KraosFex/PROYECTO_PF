export const lenguaje = (type, array) => {
  if (array.length) return array.filter((p) => p.lenguaje === type);
  return [];
};

export const ordered = (order, array) => {
  var votos = array.map((o) => o.calificacion);
  var orde = [];

  switch (order) {
    case "MasVotados":
      votos = votos.sort((a, b) => b - a);
      votos.forEach((f) => {
        array.forEach((p) => {
          if (p.calificacion === f) orde.push(p);
        });
      });
      orde = orde.filter((e, i) => orde.indexOf(e) === i);
      return orde;
    case "MenosVotados":
      votos = votos.sort((a, b) => a - b);
      votos.forEach((f) => {
        array.forEach((p) => {
          if (p.calificacion === f) orde.push(p);
        });
      });
      orde = orde.filter((e, i) => orde.indexOf(e) === i);
      return orde;
    default:
      return array;
  }
};
