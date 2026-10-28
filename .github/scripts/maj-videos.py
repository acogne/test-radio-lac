"""Met à jour videos.js depuis le flux RSS public d'une playlist YouTube.

Usage, depuis le dossier du site :  python .github/scripts/maj-videos.py
Lancé par l'Action « Vidéos YouTube » (.github/workflows/videos.yml).

- Lit https://www.youtube.com/feeds/videos.xml?playlist_id=PLAYLIST
  (YouTube n'y met que les 15 vidéos les plus récentes) ;
- écrit videos.js (id, titre, date de publication), de la plus récente à la
  plus ancienne, seulement si la liste a changé ;
- flux vide, inaccessible ou illisible : ne touche à rien.
Le message de commit est écrit dans $GITHUB_OUTPUT (clé « message »).
"""
import json, os, re, sys, urllib.request
import xml.etree.ElementTree as ET

PLAYLIST = "PLIHhN1_l6IBU"
FEED = f"https://www.youtube.com/feeds/videos.xml?playlist_id={PLAYLIST}"
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "videos.js")
NS = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}
HEADER = f"""/* Vidéos de la playlist YouTube {PLAYLIST}, de la plus récente à la plus ancienne.
   Fichier généré par .github/scripts/maj-videos.py (GitHub Action « Vidéos YouTube »,
   toutes les 6 heures) : ne pas modifier à la main. */
"""


def stop(msg):
    """Rien n'est écrit : on garde la liste actuelle."""
    print(f"::warning::{msg} videos.js n'est pas modifié.")
    sys.exit(0)


def read_feed():
    req = urllib.request.Request(FEED, headers={"User-Agent": "Mozilla/5.0 (site Radio Lac)"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            root = ET.fromstring(r.read())
    except Exception as e:
        stop(f"Flux YouTube inaccessible ou illisible ({e}).")
    videos = []
    for e in root.findall("a:entry", NS):
        vid, title, date = e.findtext("yt:videoId", namespaces=NS), e.findtext("a:title", namespaces=NS), e.findtext("a:published", namespaces=NS)
        if vid and title and date:
            videos.append({"id": vid.strip(), "title": title.strip(), "date": date.strip()})
    if not videos:
        stop("Flux YouTube vide.")
    return sorted(videos, key=lambda v: v["date"], reverse=True)


def current():
    try:
        js = open(OUT, encoding="utf-8").read()
        return json.loads(re.search(r"window\.RL\.videos = (\[.*\]);", js, re.S).group(1))
    except Exception:
        return []


def main():
    videos, old = read_feed(), current()
    if videos == old:
        print(f"{len(videos)} vidéos, aucun changement.")
        return
    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write(HEADER + "window.RL.videos = " + json.dumps(videos, ensure_ascii=False, indent=1) + ";\n")

    old_ids, new_ids = {v["id"] for v in old}, {v["id"] for v in videos}
    added = [v for v in videos if v["id"] not in old_ids]
    removed = len(old_ids - new_ids)
    parts = []
    if added:
        parts.append(f"{len(added)} nouvelle{'s' if len(added) > 1 else ''} (« {added[0]['title']} »{' …' if len(added) > 1 else ''})")
    if removed:
        parts.append(f"{removed} retirée{'s' if removed > 1 else ''}")
    if not parts:
        parts.append("titres ou dates modifiés")
    message = f"Vidéos YouTube : {', '.join(parts)}"
    print(f"{len(videos)} vidéos. {message}")
    if os.environ.get("GITHUB_OUTPUT"):
        with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as f:
            f.write(f"message={message}\n")


if __name__ == "__main__":
    main()
