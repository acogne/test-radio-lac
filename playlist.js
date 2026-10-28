/* Page Playlist : recherche par jour et heure */
(function () {
  const { $, esc, pad, toMin, hhmm, media, liveShow, hostNames, songsBefore, songCover, initAnnotations } = window.RLUI;
  const now = window.RLUI.now();
  const fmtDay = new Intl.DateTimeFormat("fr-CH", { weekday: "long", day: "numeric", month: "long" });

  // 7 derniers jours
  $("#plDay").innerHTML = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now); d.setDate(d.getDate() - i);
    const label = i === 0 ? "Aujourd'hui" : i === 1 ? "Hier" : fmtDay.format(d);
    return `<option value="${i}">${esc(label.charAt(0).toUpperCase() + label.slice(1))}</option>`;
  }).join("");
  $("#plTime").value = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  function show(e) {
    if (e) e.preventDefault();
    const d = new Date(now); d.setDate(d.getDate() - Number($("#plDay").value));
    const m = toMin($("#plTime").value || "12:00");
    d.setHours(Math.floor(m / 60), m % 60, 0, 0);

    // On ne montre pas le futur
    const target = d > now ? now : d;
    // 30 min avant et après l'heure choisie
    const end = new Date(Math.min(target.getTime() + 30 * 60000, now.getTime()));
    const list = songsBefore(end, Infinity, new Date(target.getTime() - 30 * 60000));
    if (!list.length) {
      const sh = liveShow(target).cur;
      $("#plContext").textContent = `Aucun titre enregistré entre ${hhmm(new Date(target - 30 * 60000))} et ${hhmm(target)}, pendant ${sh.name} : cette émission ne transmet pas sa liste de titres.`;
      $("#plList").innerHTML = "";
      return;
    }
    const closest = list.reduce((b, s, i) => (Math.abs(s.at - target) < Math.abs(list[b].at - target) ? i : b), 0);

    const sh = liveShow(target).cur;
    const hosts = hostNames(sh);
    const s = list[closest];
    $("#plContext").innerHTML = `Vers ${hhmm(target)}, c'était <strong>« ${esc(s.title)} »</strong> de ${esc(s.artist)}, dans ${esc(sh.name)}${hosts ? ` avec ${esc(hosts)}` : ""}.`;
    $("#plList").innerHTML = list.map((x, i) => `
      <li class="${i === closest ? "is-hit" : ""}">
        <span class="pl-time">${hhmm(x.at)}</span>
        ${media(x.artist, songCover(x), "cover-md")}
        <span class="pl-text"><span class="pl-title">${esc(x.title)}</span><span class="pl-artist">${esc(x.artist)}</span></span>
      </li>`).join("");
    const hit = $("#plList .is-hit");
    if (hit && e) hit.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  $("#plSearch").addEventListener("submit", show);
  initAnnotations();
  show();
})();
