(function () {
  const pages = [
    { href: "dashboard.html", title: "Painel Principal", subtitle: "Visão geral", mark: "01", keys: ["dashboard", "index"] },
    { href: "producao.html", title: "Pedidos", subtitle: "Ordens de venda", mark: "02", keys: ["producao"] },
    { href: "cliente.html", title: "Clientes", subtitle: "Portal e CRM", mark: "03", keys: ["cliente"] },
    { href: "solicitacoes.html", title: "Solicitacoes", subtitle: "Mensagens e aprovacoes", mark: "04", keys: ["solicitacoes"] },
    { href: "financeiro.html", title: "Financeiro", subtitle: "Fluxo de caixa", mark: "05", keys: ["financeiro"] },
    { href: "auditoria.html", title: "Auditoria", subtitle: "Log de acessos", mark: "06", keys: ["auditoria"] }
  ];

  function currentName() {
    const file = (location.pathname.split("/").pop() || "index.html").replace(".html", "");
    return file || "index";
  }

  function userName() {
    return sessionStorage.getItem("seamRioUser") || localStorage.getItem("seamRioUser") || "Equipe";
  }

  function activeFor(page, name) {
    if (name === "index" && page.keys.includes("dashboard")) return true;
    return page.keys.includes(name);
  }

  function injectSidebar(name) {
    if (document.querySelector(".seam-global-sidebar") || document.querySelector(".sidebar")) return;
    const sidebar = document.createElement("aside");
    sidebar.className = "seam-global-sidebar";
    sidebar.innerHTML = `
      <div class="seam-logo-lockup">
        <img src="seam-rio-logo.png" alt="Seam Rio">
        <strong>Seam Rio</strong>
      </div>
      <nav class="seam-global-nav" aria-label="Navegação principal">
        ${pages.map(page => `
          <a class="${activeFor(page, name) ? "active" : ""}" href="${page.href}">
            <span class="seam-nav-mark">${page.mark}</span>
            <span><strong>${page.title}</strong><span>${page.subtitle}</span></span>
          </a>
        `).join("")}
      </nav>
      <div class="seam-sidebar-foot">
        <button class="btn" type="button" data-seam-refresh>Atualizar</button>
        <button class="btn" type="button" data-seam-fullscreen>Tela cheia</button>
        <button class="btn" type="button" data-seam-logout>Sair</button>
      </div>
    `;
    document.body.prepend(sidebar);
  }

  function injectTopbar() {
    if (document.querySelector(".seam-global-topbar") || document.querySelector(".topbar")) return;
    const user = userName();
    const topbar = document.createElement("header");
    topbar.className = "seam-global-topbar";
    topbar.innerHTML = `
      <div class="seam-top-search">
        <span class="seam-search-symbol" aria-hidden="true"></span>
        <input data-seam-search placeholder="Pesquisar pedidos, clientes, produtos...">
      </div>
      <div class="seam-top-actions">
        <button class="seam-round-btn" type="button" data-seam-alert>!</button>
        <button class="seam-round-btn" type="button" data-seam-help>?</button>
      </div>
      <div class="seam-user-box">
        <div>
          <strong>Olá, ${user}</strong>
          <span>Operação Seam Rio</span>
        </div>
        <div class="seam-avatar">${user.slice(0, 2).toUpperCase()}</div>
      </div>
    `;
    document.body.prepend(topbar);
  }

  function bindActions() {
    document.querySelectorAll("[data-seam-refresh]").forEach(button => {
      button.addEventListener("click", () => location.reload());
    });
    document.querySelectorAll("[data-seam-fullscreen]").forEach(button => {
      button.addEventListener("click", () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      });
    });
    document.querySelectorAll("[data-seam-logout]").forEach(button => {
      button.addEventListener("click", () => {
        sessionStorage.removeItem("seamRioUser");
        location.href = "dashboard.html";
      });
    });
    document.querySelectorAll("[data-seam-alert]").forEach(button => {
      button.addEventListener("click", () => {
        const toast = document.querySelector("#toast");
        if (toast) {
          toast.textContent = "Alertas e mensagens aparecem nos módulos de produção e financeiro.";
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2800);
        }
      });
    });
    document.querySelectorAll("[data-seam-help]").forEach(button => {
      button.addEventListener("click", () => {
        const toast = document.querySelector("#toast");
        if (toast) {
          toast.textContent = "Use o menu lateral para alternar entre os módulos.";
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2800);
        }
      });
    });
    document.querySelectorAll("[data-seam-search]").forEach(input => {
      input.addEventListener("input", () => {
        const nativeSearch = document.querySelector("#searchInput:not([data-seam-search])");
        if (!nativeSearch) return;
        nativeSearch.value = input.value;
        nativeSearch.dispatchEvent(new Event("input", { bubbles: true }));
      });
    });
  }

  function boot() {
    document.body.classList.add("seam-theme");
    const name = currentName();
    if (name === "cliente") {
      document.body.classList.add("seam-client-portal");
      return;
    }
    injectSidebar(name);
    injectTopbar();
    bindActions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

