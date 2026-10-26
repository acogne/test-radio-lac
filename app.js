/* Page d'accueil */
(function () {
  const D = window.RL;
  const { $, $$, esc, hhmm, minLabel, now, img, media, slotTime, liveShow, hostsOf, hostNames, songsBefore, carousel, initAnnotations } = window.RLUI;

  /* ---------- Direct + grille ---------- */
  function renderLive() {
    const { grid, idx, cur, next, progress } = liveShow();
    const hosts = hostsOf(cur);
    $("#heroShow").textContent = cur.name;
    $("#heroTime").textContent = slotTime(cur);
    $("#heroHost").textContent = hosts.length ? `Avec ${hostNames(cur)}` : "";
    $("#heroNext").textContent = `${next.name} à ${minLabel(next.s)}`;
    $("#heroProgress").style.width = `${Math.round(progress * 100)}%`;
    $("#heroHosts").innerHTML = hosts.length
      ? hosts.map((h) => media(h.name, img("animateurs", h.id), "avatar avatar-xl")).join("")
      : media(cur.name, img("emissions", cur.id), "show-visual");

    $("#timeline").innerHTML = grid.map((sh, i) => {
      const state = i === idx ? "is-now" : i < idx ? "is-past" : "";
      const hs = hostsOf(sh);
      return `<li class="${state}">
        ${media(sh.name, img("emissions", sh.id), "t-visual")}
        <span class="t-time">${slotTime(sh)}</span>
        <span class="t-name">${esc(sh.name)}</span>
        ${hs.length ? `<span class="t-host"><span class="t-avatars">${hs.map((h) => media(h.name, img("animateurs", h.id), "avatar avatar-sm")).join("")}</span>${esc(hostNames(sh))}</span>` : ""}
        ${i === idx ? '<span class="t-badge">En ce moment</span>' : ""}
      </li>`;
    }).join("");
    const nowEl = $("#timeline .is-now");
    if (nowEl) $("#timeline").scrollLeft = nowEl.offsetLeft - $("#timeline").offsetLeft;
  }

  /* ---------- Titres : carrousel des 10 derniers ---------- */
  const updateSongArrows = carousel($("#songCarousel"), $("#songPrev"), $("#songNext"));
  function renderSongs() {
    const list = songsBefore(now(), 10);
    const cur = list[0];
    $("#heroCover").innerHTML = media(cur.artist, null, "cover-hero");
    $("#heroTitle").textContent = cur.title;
    $("#heroArtist").textContent = cur.artist;
    $("#songCarousel").innerHTML = list.map((s, i) => `
      <li class="song-card${i === 0 ? " is-current" : ""}">
        ${media(s.artist, null, "")}
        <span class="sc-time">${i === 0 ? "En cours" : hhmm(s.at)}</span>
        <span class="sc-title">${esc(s.title)}</span>
        <span class="sc-artist">${esc(s.artist)}</span>
      </li>`).join("");
    updateSongArrows();
  }

  /* ---------- Actu ---------- */
  $("#articles").innerHTML = D.articles.slice(0, 3).map((a) => `
    <a href="article.html?id=${a.id}" class="article">
      ${media(a.title, img("actu", a.slug), "article-img")}
      <span class="a-tag">${esc(a.tag)}</span>
      <span class="a-title">${esc(a.title)}</span>
      <span class="a-date">${esc(a.date)}</span>
    </a>`).join("");

  /* ---------- Podcasts : filtre par émission ---------- */
  const filters = [["all", "Tout"], ...["le-meilleur-des-reveils", "il-suffit-de-demander", "jpeux-pas-j-ai-radio-lac"].map((id) => [id, D.shows[id].name]), ["none", "Le truc en plus"]];
  $("#podcastFilters").innerHTML = filters.map(([key, label], i) =>
    `<button role="tab" aria-selected="${i === 0}" data-filter="${key}">${esc(label)}</button>`).join("");
  function renderPodcasts(filter) {
    const list = filter === "all" ? D.podcasts.slice(0, 8) : D.podcasts.filter((p) => (p.show || "none") === filter);
    $("#replays").innerHTML = list.map((p) => `
      <a href="podcasts.html#${p.slug}" class="replay">${media(p.title, img("podcasts", p.slug))}
      <span class="r-show">${esc(p.show ? D.shows[p.show].name : "Chronique")}</span>
      <span class="r-title">${esc(p.title)}</span><span class="r-ep">${esc(p.ep)}</span>
      <span class="r-meta">${esc(p.date)}</span></a>`).join("");
  }
  renderPodcasts("all");
  $$("#podcastFilters button").forEach((b) => b.addEventListener("click", () => {
    $$("#podcastFilters button").forEach((x) => x.setAttribute("aria-selected", x === b));
    renderPodcasts(b.dataset.filter);
  }));

  /* ---------- Webradios : carrousel, 4 visibles ---------- */
  $("#wrCarousel").innerHTML = D.webradios.map((w) => `
    <li><a href="webradios.html#${w.slug}" class="wr">${media(w.name, img("webradios", w.slug), "round")}<p class="wr-name">${esc(w.name)}</p></a></li>`).join("");
  carousel($("#wrCarousel"), $("#wrPrev"), $("#wrNext"))();

  /* ---------- Le lac = l'onde ---------- */
  const N = 120, W = 1200 / N;
  $("#lake").innerHTML = Array.from({ length: N }, (_, i) => {
    const h = 8 + Math.abs(Math.sin(i * 0.33) * 26 + Math.sin(i * 0.11) * 18);
    return `<rect x="${i * W + 2}" y="${60 - h}" width="${W - 4}" height="${h}" rx="2" style="animation-delay:${(i % 12) * 0.11}s"/>`;
  }).join("");

  initAnnotations();
  renderLive(); renderSongs();
  setInterval(renderLive, 60000);
  setInterval(renderSongs, 60000);
})();
