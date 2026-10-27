/* Pages de liste : émissions, animateurs, fréquences, actu, article, concours, podcasts, webradios */
(function () {
  const D = window.RL;
  const { $, $$, esc, now, img, media, dayIdx, daySlots, slotTime, liveShow, hostsOf, hostNames, episodes, episodeCard, videoFrame, initAnnotations } = window.RLUI;
  const page = document.body.dataset.page;
  const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);

  const articleCard = (a) => `
    <a href="article.html?id=${a.id}" class="article">
      ${media(a.title, img("actu", a.slug), "article-img")}
      <span class="a-tag">${esc(a.tag)}</span>
      <span class="a-title">${esc(a.title)}</span>
      <span class="a-date">${esc(a.date)}</span>
    </a>`;

  /* ---------- Émissions : grille de la semaine, un onglet par jour ---------- */
  function emissions() {
    const today = dayIdx(now());
    const live = liveShow();
    // Entre 00h et 01h, l'émission en cours peut appartenir à la grille de la veille
    const liveDay = live.cur.fromYesterday ? (today + 6) % 7 : today;
    const liveStart = live.cur.fromYesterday ? live.cur.s + 1440 : live.cur.s;
    $("#dayTabs").innerHTML = D.week.map((d, i) =>
      `<button role="tab" id="tab-${i}" aria-controls="schedule" aria-selected="${i === today}" tabindex="${i === today ? 0 : -1}" data-day="${i}">${d.day}${i === today ? " (aujourd'hui)" : ""}</button>`).join("");
    function show(di) {
      $$("#dayTabs button").forEach((b) => {
        const on = Number(b.dataset.day) === di;
        b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1;
      });
      $("#schedule").setAttribute("aria-labelledby", `tab-${di}`);
      $("#schedule").innerHTML = daySlots(di).map((sh) => {
        const isNow = di === liveDay && sh.s === liveStart;
        const hs = hostsOf(sh);
        return `<li class="${isNow ? "is-now" : ""}">
          ${media(sh.name, img("emissions", sh.id), "sched-visual")}
          <span class="sched-text">
            <span class="t-time">${slotTime(sh)}</span>
            <span class="t-name">${esc(sh.name)}</span>
            ${hs.length ? `<span class="t-host"><span class="t-avatars">${hs.map((h) => media(h.name, img("animateurs", h.id), "avatar avatar-sm")).join("")}</span>${esc(hostNames(sh))}</span>` : ""}
            ${isNow ? '<span class="t-badge">En ce moment</span>' : ""}
          </span>
        </li>`;
      }).join("");
    }
    $("#dayTabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) show(Number(b.dataset.day)); });
    $("#dayTabs").addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!d) return;
      const cur = Number(document.activeElement.dataset.day);
      const next = (cur + d + 7) % 7;
      show(next); $(`#tab-${next}`).focus();
    });
    show(today);
  }

  /* ---------- Animateurs : émissions et horaires tirés de la grille ---------- */
  function scheduleOf(hostId) {
    // émission → [{ day, ranges }] ; jours consécutifs aux mêmes horaires regroupés
    const out = new Map();
    D.week.forEach((d, di) => {
      daySlots(di).filter((sh) => sh.hosts.includes(hostId)).forEach((sh) => {
        if (!out.has(sh.id)) out.set(sh.id, new Map());
        const days = out.get(sh.id);
        days.set(di, [...(days.get(di) || []), slotTime(sh)]);
      });
    });
    return [...out].map(([id, days]) => {
      const groups = [];
      [...days].forEach(([di, ranges]) => {
        const r = ranges.join(" et "), last = groups[groups.length - 1];
        if (last && last.r === r && last.to === di - 1) last.to = di; else groups.push({ from: di, to: di, r });
      });
      const label = (g) => (g.from === g.to ? D.week[g.from].day : `Du ${lower(D.week[g.from].day)} au ${lower(D.week[g.to].day)}`);
      return { name: D.shows[id].name, lines: groups.map((g) => `${label(g)} : ${g.r}`) };
    });
  }
  function animateurs() {
    $("#hostsList").innerHTML = D.hosts.map((h) => `
      <article class="host-card">
        ${media(h.name, img("animateurs", h.id), "host-portrait")}
        <h2>${esc(h.name)}</h2>
        ${scheduleOf(h.id).map((s) => `<div class="host-show"><p class="host-show-name">${esc(s.name)}</p>${s.lines.map((l) => `<p class="host-show-time">${esc(l)}</p>`).join("")}</div>`).join("")}
      </article>`).join("");
  }

  /* ---------- Fréquences ---------- */
  function frequences() {
    $("#freqIntro").textContent = D.frequencies.intro;
    $("#freqList").innerHTML = `
      <li class="freq-card freq-dab"><span class="freq-num">DAB+</span><span class="freq-zone">Toute la Suisse romande</span></li>
      ${D.frequencies.fm.map((f) => `<li class="freq-card"><span class="freq-num${f.freq.length > 5 ? " is-multi" : ""}">${esc(f.freq)} <small>FM</small></span><span class="freq-zone">${esc(f.zone)}</span></li>`).join("")}`;
  }

  /* ---------- Actu et concours ---------- */
  function actu() { $("#articlesList").innerHTML = D.articles.map(articleCard).join(""); }
  function concours() {
    const list = D.articles.filter((a) => a.tag === "Concours");
    $("#articlesList").innerHTML = list.map(articleCard).join("");
    $("#emptyState").hidden = list.length > 0;
  }

  /* ---------- Article ---------- */
  function article() {
    const id = Number(new URLSearchParams(location.search).get("id"));
    const a = D.articles.find((x) => x.id === id);
    if (!a) {
      document.title = "Article introuvable, Radio Lac";
      $("#articleBody").innerHTML = `<div class="empty"><h1>Cet article n'existe pas</h1><p class="lede">Le lien est peut-être incomplet ou l'article a été retiré.</p><a href="actu.html" class="btn-dark">Voir toute l'actu</a></div>`;
      $("#otherArticles").hidden = true;
      return;
    }
    document.title = `${a.title}, Radio Lac`;
    $("#articleBody").innerHTML = `
      ${media(a.title, img("actu", a.slug), "article-hero")}
      <span class="a-tag">${esc(a.tag)}</span>
      <h1>${esc(a.title)}</h1>
      <p class="a-date">${esc(a.date)}</p>
      <div class="prose">${a.body}</div>`;
    $("#otherList").innerHTML = D.articles.filter((x) => x !== a).map(articleCard).join("");
  }

  /* ---------- Podcasts : une section par émission, ses 8 derniers épisodes ---------- */
  function podcasts() {
    const all = episodes();
    const ids = [...new Set(D.chronicles.map((c) => c.show).filter(Boolean))];
    const sections = [
      ...ids.map((id) => ({ id, title: D.shows[id].name, hosts: hostNames(D.shows[id]) })),
      { id: null, title: "Le truc en plus", hosts: "" }
    ];
    $("#podcastSections").innerHTML = sections.map((s, i) => `
      <section class="section${i % 2 ? " section-tint" : ""}" aria-labelledby="pc-${i}">
        <div class="wrap">
          <div class="section-head"><div><h2 id="pc-${i}">${esc(s.title)}</h2>${s.hosts ? `<p class="lede">Avec ${esc(s.hosts)}</p>` : ""}</div></div>
          <div class="replays">${all.filter((e) => e.ch.show === s.id).slice(0, 8).map((e) => episodeCard(e)).join("")}</div>
        </div>
      </section>`).join("");
  }

  /* ---------- Vidéos : toutes, en grille, lecture au clic ---------- */
  function videos() {
    $("#videosList").innerHTML = D.videos.map((v) => `
      <article class="video-card">${videoFrame(v)}<h2 class="v-title">${esc(v.title)}</h2></article>`).join("");
  }

  /* ---------- Webradios ---------- */
  function webradios() {
    $("#webradiosList").innerHTML = D.webradios.map((w) => `
      <li class="wr" id="${w.slug}">${media(w.name, img("webradios", w.slug), "round")}<p class="wr-name">${esc(w.name)}</p></li>`).join("");
  }

  ({ emissions, animateurs, frequences, actu, concours, article, podcasts, videos, webradios })[page]();
  initAnnotations();
})();
