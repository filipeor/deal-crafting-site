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
});
