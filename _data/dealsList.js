const fs = require("fs");
const path = require("path");

// Achata _data/deals.json (que o Decap CMS grava como { deals: [...], stats: {...} })
// em uma lista já ordenada, pra ficar simples de usar nos templates.
module.exports = () => {
  const file = path.join(__dirname, "deals.json");
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const lista = (raw.deals || []).slice();
  lista.sort((a, b) => new Date(b.data) - new Date(a.data));
  return lista;
};
