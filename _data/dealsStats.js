const fs = require("fs");
const path = require("path");

module.exports = () => {
  const file = path.join(__dirname, "deals.json");
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  return (
    raw.stats || {
      volumeNoMes: "—",
      dealsNoMes: "—",
      ticketMedio: "—",
      setoresAtivos: "—",
    }
  );
};
