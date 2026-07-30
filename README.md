# deal.crafting — site + CMS grátis

Este projeto é o site deal.crafting reconstruído como um **site gerado** (usando [Eleventy](https://www.11ty.dev/)), para que o conteúdo (notícias, deals, página Sobre) possa ser editado por um painel visual — o **Decap CMS** — sem precisar tocar em código. O visual é exatamente o mesmo que já estava pronto.

Tudo abaixo é 100% gratuito: hospedagem (Netlify), editor de conteúdo (Decap CMS) e login de quem pode publicar (Netlify Identity).

## Como o conteúdo é organizado

- `content/noticias/*.md` — cada matéria é um arquivo. O Decap CMS cria e edita esses arquivos por você.
- `_data/deals.json` — a league table de deals (a tabela que aparece em Home e em Deals) e os números do topo da página Deals.
- `content/pages/sobre.md` — o texto da página Sobre.
- `assets/` — CSS, JS e o logo. Não precisa mexer aqui no dia a dia.
- `_includes/` e os arquivos `.njk` na raiz — os layouts/templates. Só mexa aqui se quiser mudar o design.

## Publicando (passo a passo)

**1. Crie uma conta no GitHub** (github.com), se ainda não tiver.

**2. Crie um repositório novo** (ex: `deal-crafting-site`) e suba esta pasta inteira nele. O jeito mais simples, sem usar linha de comando:
   - No GitHub, clique em "Add file → Upload files" e arraste todos os arquivos e pastas desta pasta (menos `node_modules` e `_site`, que não devem existir aqui — o `.gitignore` já cuida disso se você usar Git de verdade).

**3. Crie uma conta no [Netlify](https://netlify.com)** (grátis, pode ser com a conta do GitHub).

**4. No Netlify, clique em "Add new site → Import an existing project"** e escolha o repositório que você acabou de criar. O Netlify já vai detectar as configurações certas (build command `npm run build`, pasta `_site`) porque estão no arquivo `netlify.toml`.

**5. Espere o primeiro deploy terminar.** Seu site já estará no ar num link tipo `nome-aleatorio.netlify.app`.

**6. Conecte seu domínio próprio:** em Domain settings → Add custom domain, digite o domínio que você já comprou e siga as instruções de DNS.

## Ativando o editor (Decap CMS)

**7. No painel do Netlify, vá em Site configuration → Identity → Enable Identity.**

**8. Ainda em Identity, vá em Services → Git Gateway → Enable Git Gateway.** É isso que permite o editor salvar o conteúdo direto no GitHub sem você precisar criar senha nem token em lugar nenhum.

**9. Em Identity → Invite users, convide seu próprio e-mail** (e de quem mais for escrever no site). Você vai receber um e-mail para criar uma senha.

**10. Acesse `seusite.com/admin`** (ou `nome-aleatorio.netlify.app/admin` antes de configurar o domínio), faça login, e pronto: editor visual para Notícias, Deals e a página Sobre.

Cada vez que alguém salva/publica algo no `/admin`, o Netlify recebe a mudança no GitHub e republica o site sozinho — geralmente em menos de um minuto.

## Testando no seu computador antes de publicar (opcional)

Se tiver Node.js instalado:

```bash
npm install
npm start
```

Isso abre uma prévia do site em `http://localhost:8080`. O painel `/admin` não funciona localmente sem configuração extra (ele depende do Netlify Identity/Git Gateway) — pra testar o editor de verdade, use o site já publicado no Netlify.

## Sobre o conteúdo de exemplo

Todas as notícias e deals que já estão aqui são fictícios, só para mostrar como o layout fica preenchido. Edite ou apague pelo `/admin` assim que o site estiver no ar.
