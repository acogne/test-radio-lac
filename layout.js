/* Éléments communs à toutes les pages : header, footer, player, annotations. */
(function () {
  const D = window.RL;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const toMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  const hhmm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const minLabel = (m) => `${pad(Math.floor((m % 1440) / 60))}:${pad(m % 60)}`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Heure : ?now=2026-10-31T00:30 force l'heure (démo, tests) ---------- */
  const params = new URLSearchParams(location.search);
  const forced = params.get("now") ? new Date(params.get("now")) : null;
  const offset = forced && !isNaN(forced) ? forced.getTime() - Date.now() : 0;
  const now = () => new Date(Date.now() + offset);
  // Garde ?now= en passant d'une page à l'autre
  const withNow = (href) => {
    if (!offset || !/^[\w-]+\.html/.test(href)) return href;
    const [path, hash = ""] = href.split("#");
    return `${path}${path.includes("?") ? "&" : "?"}now=${encodeURIComponent(params.get("now"))}${hash ? `#${hash}` : ""}`;
  };

  /* ---------- Images : versions optimisées de img-web/ ---------- */
  const img = (dir, slug) => `img-web/${dir}/${slug}.webp`;

  /* ---------- Vignettes : image si elle existe, sinon couleur ---------- */
  const palette = ["#3FCFD5", "#22A9B0", "#0F3D48", "#1B6F86", "#2BB8A3", "#2E8FA8", "#145560", "#0A6E74"];
  const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const initials = (s) => s.replace(/[^\p{L}\p{N} ]/gu, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  function media(label, src, cls = "") {
    const h = hash(label);
    const bg = `linear-gradient(135deg,${palette[h % 8]},${palette[(h >>> 3) % 8]})`;
    const im = src ? `<img src="${esc(src)}" alt="" loading="lazy" onload="RLUI.fit(this)" onerror="this.remove()">` : "";
    return `<div class="cover ${cls}" style="background:${bg}" aria-hidden="true"><span>${esc(initials(label))}</span>${im}</div>`;
  }

  // Visuel d'article trop éloigné du cadre 16:9 : affiché en entier plutôt que rogné
  function fit(im) {
    const box = im.parentNode;
    if (!box.matches(".article-img, .article-hero")) return;
    const r = im.naturalWidth / im.naturalHeight, frame = box.clientWidth / box.clientHeight;
    box.classList.toggle("is-contain", Math.abs(r - frame) / frame > 0.2);
  }

  /* ---------- Grille ---------- */
  // Jour 0 = lundi. Minutes relatives au début du jour ; une émission qui
  // passe minuit finit après 1440 (Lac Fever : 1320 → 1500).
  const dayIdx = (date) => (date.getDay() + 6) % 7;
  const daySlots = (di) => D.week[di].slots.map(([s, e, id]) => ({ s: toMin(s), e: toMin(e), id, ...D.shows[id] }));
  const slotTime = (sh) => `${minLabel(sh.s < 0 ? sh.s + 1440 : sh.s)} – ${minLabel(sh.e)}`;
  // Émissions du jour, avec en tête celle de la veille si elle déborde après minuit
  function dayGrid(date) {
    const di = dayIdx(date);
    const prev = daySlots((di + 6) % 7).filter((sh) => sh.e > 1440).map((sh) => ({ ...sh, s: sh.s - 1440, e: sh.e - 1440, fromYesterday: true }));
    return [...prev, ...daySlots(di)];
  }
  function liveShow(date = now()) {
    const mins = date.getHours() * 60 + date.getMinutes();
    const full = dayGrid(date);
    let idx = Math.max(0, full.findIndex((sh) => mins >= sh.s && mins < sh.e));
    // La veille n'apparaît dans la grille du jour que tant qu'elle est en cours
    const grid = full.filter((sh, i) => !sh.fromYesterday || i === idx);
    idx = grid.indexOf(full[idx]);
    const cur = grid[idx];
    // Prochaine émission différente (le même programme peut continuer après minuit)
    const next = [...grid.slice(idx + 1), ...daySlots((dayIdx(date) + 1) % 7)].find((sh) => sh.id !== cur.id);
    const progress = (mins - cur.s) / (cur.e - cur.s);
    return { grid, idx, cur, next, progress };
  }
  const hostsOf = (show) => show.hosts.map((id) => D.hosts.find((h) => h.id === id)).filter(Boolean);
  const hostNames = (show) => hostsOf(show).map((h) => h.name).join(" et ");

  /* ---------- Titres : simulation déterministe, un titre toutes les 4 min ---------- */
  const SLOT = 4 * 60000;
  const songAtSlot = (k) => D.songs[((k * 7) % D.songs.length + D.songs.length) % D.songs.length];
  function songsBefore(date, n) {
    const k0 = Math.floor(date.getTime() / SLOT);
    return Array.from({ length: n }, (_, i) => ({ ...songAtSlot(k0 - i), at: new Date((k0 - i) * SLOT) }));
  }

  /* ---------- Carrousel : flèches, 4 visibles ---------- */
  function carousel(car, prev, next) {
    const step = () => (car.firstElementChild ? car.firstElementChild.getBoundingClientRect().width + 16 : 300);
    const update = () => {
      prev.disabled = car.scrollLeft < 4;
      next.disabled = car.scrollLeft + car.clientWidth >= car.scrollWidth - 4;
    };
    prev.addEventListener("click", () => car.scrollBy({ left: -step() * 2, behavior: "smooth" }));
    next.addEventListener("click", () => car.scrollBy({ left: step() * 2, behavior: "smooth" }));
    car.addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return update;
  }

  /* ---------- Header / footer / player ---------- */
  const page = document.body.dataset.page || "home";
  const radioPages = ["emissions", "animateurs", "frequences", "actu", "article"];
  const cur = (keys) => ([].concat(keys).includes(page) ? ' aria-current="page"' : "");
  const navItem = (href, label, key) => `<a href="${href}" class="nav-link${page === key ? " is-active" : ""}"${cur(key)}>${label}</a>`;
  // Réseaux sociaux (data.js) : seuls ceux qui ont une URL sont affichés
  const socialLinks = (cls) => `<div class="${cls}">${D.socials.filter((s) => s.url).map((s) =>
    `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="Radio Lac sur ${esc(s.name)}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${s.icon}"/></svg></a>`).join("")}</div>`;

  let bar = "Maquette interne : contenus réels, titres diffusés et épisodes d'exemple";
  if (offset) bar += ` · Heure simulée : ${new Intl.DateTimeFormat("fr-CH", { weekday: "long", hour: "2-digit", minute: "2-digit" }).format(forced)}`;

  $("#site-header").outerHTML = `
  <div class="proto-bar">
    <span>${esc(bar)}</span>
    <button id="annotToggle" class="annot-toggle" aria-pressed="false">Voir l'effort de production par bloc</button>
  </div>
  <header class="site-header">
    <div class="wrap header-inner">
      <a href="index.html" class="logo" aria-label="Radio Lac, accueil">
        <img src="img-web/Logo-Radio-Lac-paysage.png" alt="" class="logo-img" onerror="this.remove()">
        <span class="logo-mark" aria-hidden="true"></span><span class="logo-word">Radio Lac</span>
      </a>
      <nav class="main-nav" id="mainNav" aria-label="Navigation principale">
        <div class="has-sub">
          <button class="nav-link sub-toggle${radioPages.includes(page) ? " is-active" : ""}" aria-expanded="false">Radio <span class="caret" aria-hidden="true"></span></button>
          <div class="sub">
            <a href="emissions.html"${cur("emissions")}>Émissions</a>
            <a href="animateurs.html"${cur("animateurs")}>Animateurs</a>
            <a href="frequences.html"${cur("frequences")}>Fréquences</a>
            <a href="actu.html"${cur(["actu", "article"])}>Actu</a>
          </div>
        </div>
        ${navItem("podcasts.html", "Podcasts", "podcasts")}
        ${navItem("playlist.html", "Playlist", "playlist")}
        ${navItem("concours.html", "Concours", "concours")}
        ${navItem("webradios.html", "Webradios", "webradios")}
        ${socialLinks("social nav-social")}
      </nav>
      <button class="btn-live js-play" aria-label="Écouter le direct">
        <span class="play-ico" aria-hidden="true"></span><span class="btn-live-label js-play-label">En direct</span>
      </button>
      <button class="burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="mainNav"><span></span></button>
    </div>
  </header>`;

  $("#site-footer").outerHTML = `
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <div class="footer-info">
        <p class="footer-info-title">Vous cherchez l'actualité régionale ?</p>
        <p>Toute l'info de Genève et de Suisse romande continue sur <span class="footer-info-name">${esc(D.infoSiteName)}</span>.</p>
      </div>
      <div class="footer-cols">
        <div><p class="fc-title">La radio</p>
          <a href="emissions.html">Émissions</a><a href="animateurs.html">Animateurs</a><a href="frequences.html">Fréquences &amp; DAB+</a><a href="actu.html">Actu</a><a href="index.html#partout">Contact</a></div>
        <div><p class="fc-title">Écouter</p>
          <a href="playlist.html">C'était quoi ce titre ?</a><a href="podcasts.html">Podcasts</a><a href="webradios.html">Webradios</a><a data-app="ios">App iPhone</a><a data-app="android">App Android</a></div>
        <div><p class="fc-title">Media One Group</p>
          <a href="http://www.mediaone.ch">Publicité</a><a href="https://www.mediaonegroup.ch/emplois-et-stages/">Emplois</a><span class="fc-static">Règlements des concours</span><span class="fc-static">Données personnelles</span></div>
      </div>
    </div>
    <div class="wrap footer-bottom"><span>© 2026 Radio Lac, Media One Group</span>${socialLinks("social footer-social")}</div>
  </footer>
  <div class="dock" role="region" aria-label="Lecteur du direct">
    <div class="wrap dock-inner">
      <div id="dockCover"></div>
      <div class="dock-meta"><p class="dock-title" id="dockTitle"></p><p class="dock-show" id="dockShow"></p></div>
      <div class="dock-eq" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <button class="dock-play js-play" aria-label="Écouter le direct"><span class="play-ico" aria-hidden="true"></span></button>
    </div>
  </div>
  <div class="annot-legend" id="annotLegend" hidden>
    <p class="al-title">Effort de production</p>
    <p><span class="sw sw-auto"></span>Automatique</p>
    <p><span class="sw sw-light"></span>Léger, au fil de l'eau</p>
    <p class="al-sum" id="annotSum"></p>
  </div>`;

  // Liens des applications (data.js)
  $$("[data-app]").forEach((a) => { a.href = D.apps[a.dataset.app]; });

  function renderDock() {
    const s = songsBefore(now(), 1)[0];
    $("#dockCover").innerHTML = media(s.artist, null, "cover-sm");
    $("#dockTitle").textContent = `${s.title} – ${s.artist}`;
    $("#dockShow").textContent = `${liveShow().cur.name}, en direct`;
  }

  /* ---------- Lecture ---------- */
  let audio = null, playing = false;
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".js-play"); if (!b) return;
    if (!D.streamUrl) { if (!playing) window.open(D.playerUrl, "_blank", "noopener"); }
    else { audio = audio || new Audio(D.streamUrl); playing ? audio.pause() : audio.play(); }
    playing = !playing;
    document.body.classList.toggle("is-playing", playing);
    $$(".js-play-label").forEach((l) => { l.textContent = playing ? "Pause" : l.dataset.label || "En direct"; });
  });

  /* ---------- Liens : ?now= suit la navigation ---------- */
  if (offset) document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]:not([href^='http'])"); // liens externes intacts
    if (a) a.setAttribute("href", withNow(a.getAttribute("href")));
  }, true);

  /* ---------- Menus ---------- */
  $("#burger").addEventListener("click", (e) => {
    const open = $("#mainNav").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });
  const subBtn = $(".sub-toggle");
  subBtn.addEventListener("click", () => {
    const open = subBtn.getAttribute("aria-expanded") !== "true";
    subBtn.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-sub")) subBtn.setAttribute("aria-expanded", "false");
    if (e.target.closest(".main-nav a")) $("#mainNav").classList.remove("open");
  });

  /* ---------- Annotations ---------- */
  function initAnnotations() {
    const blocks = $$("[data-effort]");
    const auto = blocks.filter((b) => b.dataset.effort === "auto").length;
    $("#annotSum").textContent = `${auto} blocs sur ${blocks.length} se remplissent seuls.`;
    $("#annotToggle").addEventListener("click", (e) => {
      const on = document.body.classList.toggle("annot");
      e.currentTarget.setAttribute("aria-pressed", on);
      e.currentTarget.textContent = on ? "Masquer l'effort de production" : "Voir l'effort de production par bloc";
      $("#annotLegend").hidden = !on;
    });
    if (location.hash === "#annotations") $("#annotToggle").click();
  }

  window.RLUI = { $, $$, esc, pad, toMin, hhmm, minLabel, now, img, media, fit, dayIdx, daySlots, dayGrid, slotTime, liveShow, hostsOf, hostNames, songsBefore, SLOT, carousel, renderDock, initAnnotations };
  renderDock();
  setInterval(renderDock, 30000);
})();
