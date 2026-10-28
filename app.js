/* Page d'accueil */
(function () {
  const D = window.RL;
  const { $, $$, esc, hhmm, minLabel, now, img, media, slotTime, liveShow, hostsOf, hostNames, episodes, episodeCard, videoThumb, videoFrame, playVideo, songsBefore, songCover, onAir, carousel, initAnnotations } = window.RLUI;

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
    $("#heroCover").innerHTML = media(cur.artist, songCover(cur), "cover-hero");
    const live = onAir(cur);
    $("#heroSongLabel").textContent = live ? "À l'antenne" : `Dernier titre, à ${hhmm(cur.at)}`;
    $("#heroTitle").textContent = cur.title;
    $("#heroArtist").textContent = cur.artist;
    $("#songCarousel").innerHTML = list.map((s, i) => `
      <li class="song-card${i === 0 && live ? " is-current" : ""}">
        ${media(s.artist, songCover(s), "")}
        <span class="sc-time">${i === 0 && live ? "En cours" : hhmm(s.at)}</span>
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
  // 8 derniers épisodes, toutes émissions ou celle du filtre
  function renderPodcasts(filter) {
    const list = episodes().filter((e) => filter === "all" || (e.ch.show || "none") === filter).slice(0, 8);
    $("#replays").innerHTML = list.map((e) => episodeCard(e, true)).join("");
  }
  renderPodcasts("all");
  $$("#podcastFilters button").forEach((b) => b.addEventListener("click", () => {
    $$("#podcastFilters button").forEach((x) => x.setAttribute("aria-selected", x === b));
    renderPodcasts(b.dataset.filter);
  }));

  /* ---------- Vidéos : la plus récente en grand, les 4 suivantes en liste ---------- */
  // Cliquer une vidéo de la liste l'échange avec la grande et la lance
  const vids = (D.videos || []).slice(0, 5);
  function renderVideos(play) {
    if (!vids.length) { $("#videos").hidden = true; return; }
    $("#videoMain").innerHTML = `${videoFrame(vids[0])}<h3 class="v-title">${esc(vids[0].title)}</h3>`;
    $("#videoList").innerHTML = vids.slice(1).map((v) => `
      <li><button class="v-item" data-id="${v.id}" aria-label="Lire la vidéo : ${esc(v.title)}">
        <span class="v-thumb">${videoThumb(v.id, "mqdefault")}</span><span class="v-item-title">${esc(v.title)}</span>
      </button></li>`).join("");
    if (play) playVideo($("#videoMain .video"));
  }
  renderVideos(false);
  $("#videoList").addEventListener("click", (e) => {
    const b = e.target.closest(".v-item"); if (!b) return;
    const i = vids.findIndex((v) => v.id === b.dataset.id);
    [vids[0], vids[i]] = [vids[i], vids[0]];
    renderVideos(true);
  });

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
