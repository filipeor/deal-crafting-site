const fs = require("fs");

module.exports = function (eleventyConfig) {
  // Arquivos estáticos que só precisam ser copiados, sem processamento
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  // Evita que o Eleventy tente "processar" o admin (painel do Decap CMS)
  // como se fosse um template — ele deve ser só copiado, do jeito que está.
  eleventyConfig.ignores.add("admin/**");
  // O README é documentação do projeto, não uma página do site
  eleventyConfig.ignores.add("README.md");

  // Coleção de notícias, ordenada da mais recente para a mais antiga
  eleventyConfig.addCollection("noticias", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/noticias/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  const MESES_ABREV = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

  // Usa os métodos UTC pra não deixar a data "voltar um dia" dependendo do fuso horário
  // (o front matter `date: 2026-07-30` vira meia-noite UTC internamente).
  eleventyConfig.addFilter("dataCurta", function (dateInput) {
    if (!dateInput) return "";
    const d = new Date(dateInput);
    const dia = String(d.getUTCDate()).padStart(2, "0");
    const mes = MESES_ABREV[d.getUTCMonth()];
    const ano = d.getUTCFullYear();
    return `${dia} ${mes} ${ano}`;
  });

  eleventyConfig.addFilter("dataDiaMes", function (dateInput) {
    if (!dateInput) return "";
    const d = new Date(dateInput);
    const dia = String(d.getUTCDate()).padStart(2, "0");
    const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
    return `${dia}/${mes}`;
  });

  // Duas letras pra usar como marca d'água nos cards sem imagem
  eleventyConfig.addFilter("iniciais2", function (str) {
    return (str || "").slice(0, 2).toUpperCase();
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
