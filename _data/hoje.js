module.exports = () => {
  const d = new Date();
  const longa = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
  return {
    ano: d.getFullYear(),
    longa: longa.charAt(0).toUpperCase() + longa.slice(1),
  };
};
