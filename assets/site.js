// deal.crafting — interações leves de front-end (protótipo estático)

document.addEventListener("DOMContentLoaded", function () {
  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".masthead-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.style.display === "flex";
      nav.style.display = open ? "none" : "flex";
      nav.style.flexDirection = "column";
      nav.style.position = "absolute";
      nav.style.top = "58px";
      nav.style.left = "0";
      nav.style.right = "0";
      nav.style.background = "#130F09";
      nav.style.padding = "16px 24px";
      nav.style.gap = "14px";
      nav.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
    });
  }

  // Filtros (Notícias / Deals) — client-side, apenas para o protótipo
  var filterGroups = document.querySelectorAll("[data-filter-group]");
  filterGroups.forEach(function (group) {
    var buttons = group.querySelectorAll(".filter-btn");
    var targetSelector = group.getAttribute("data-filter-group");
    var items = document.querySelectorAll(targetSelector);

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-cat");
        items.forEach(function (item) {
          if (cat === "todos" || item.getAttribute("data-cat") === cat) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  });

  // Newsletter — feedback visual (não envia dados de verdade, protótipo)
  var forms = document.querySelectorAll(".newsletter-form");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button");
      var original = btn.textContent;
      btn.textContent = "Inscrito ✓";
      setTimeout(function () { btn.textContent = original; }, 2500);
      form.reset();
    });
  });

  // Barra macro (Dólar, Euro, Selic, IPCA) — dados ao vivo
  if (document.getElementById("macro-bar")) {
    atualizarMacro();
    setInterval(atualizarMacro, 5 * 60 * 1000); // atualiza a cada 5 minutos
  }
});

function fmtNumeroBR(valor, casas) {
  var n = Number(valor);
  if (isNaN(n)) return "--";
  return n.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
}

function setMacroItem(metrica, textoValor, variacaoPct) {
  var item = document.querySelector('.macro-item[data-metric="' + metrica + '"]');
  if (!item) return;
  var valorEl = item.querySelector(".macro-value");
  if (valorEl) valorEl.textContent = textoValor;
  if (typeof variacaoPct === "number" && !isNaN(variacaoPct)) {
    var changeEl = item.querySelector(".macro-change");
    if (changeEl) {
      var subiu = variacaoPct >= 0;
      changeEl.textContent = (subiu ? "▲ " : "▼ ") + fmtNumeroBR(Math.abs(variacaoPct), 2) + "%";
      changeEl.className = "macro-change " + (subiu ? "up" : "down");
    }
  }
}

function atualizarMacro() {
  // Câmbio — AwesomeAPI (cotação com poucos minutos de atraso)
  fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d.USDBRL) setMacroItem("usd", "R$ " + fmtNumeroBR(d.USDBRL.bid, 2), Number(d.USDBRL.pctChange));
      if (d.EURBRL) setMacroItem("eur", "R$ " + fmtNumeroBR(d.EURBRL.bid, 2), Number(d.EURBRL.pctChange));
    })
    .catch(function () { /* mantém o valor anterior/placeholder */ });

  // Selic — Banco Central (série 432, meta Selic definida pelo Copom)
  fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d && d[0]) setMacroItem("selic", fmtNumeroBR(d[0].valor, 2) + "% a.a.");
    })
    .catch(function () {});

  // IPCA acumulado 12 meses — Banco Central (série 13522)
  fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/1?formato=json")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d && d[0]) setMacroItem("ipca", fmtNumeroBR(d[0].valor, 2) + "%");
    })
    .catch(function () {});

  var atualizado = document.getElementById("macro-updated");
  if (atualizado) {
    var agora = new Date();
    atualizado.textContent = "Atualizado " + agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }
}
