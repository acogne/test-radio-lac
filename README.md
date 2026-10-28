# Radio Lac — démo du futur site

Démo statique (HTML/CSS/JS, sans dépendance ni étape de build) du site Radio Lac recentré sur l'antenne : musique, divertissement, émissions. L'information régionale part sur un autre site, signalé en pied de page.

Le site fonctionne sur GitHub Pages **et** en local, en double-cliquant sur `index.html`.

Bouton **« Voir l'effort de production par bloc »** (bandeau du haut) : montre pour chaque bloc s'il se remplit seul, demande un peu de travail, ou relève de la régie (publicité, en violet). Lien direct : `index.html#annotations`.

Bouton **« Voir avec habillage »** : simule un habillage publicitaire (fond de page dans les marges et espace de 250 px en haut), visible sur un écran de plus de 1180 px de large. L'état est gardé d'une page à l'autre (`?habillage=1`).

## Pages

| Page | Contenu | Script |
|---|---|---|
| `index.html` | Accueil : direct, grille du jour, titres, actu, podcasts, vidéos, webradios, apps | `app.js` |
| `emissions.html` | Grille de la semaine, un onglet par jour (jour courant par défaut) | `pages.js` |
| `animateurs.html` | Les 4 animateurs, leurs émissions et horaires (déduits de la grille) | `pages.js` |
| `frequences.html` | DAB+, fréquences FM, liens des apps | `pages.js` |
| `actu.html` | Tous les articles | `pages.js` |
| `article.html?id=N` | Un article (N = 1, 2, 3…) ; id inconnu → message et lien vers l'actu | `pages.js` |
| `concours.html` | Les articles de catégorie « Concours » (état vide prévu s'il n'y en a aucun) | `pages.js` |
| `podcasts.html` | Les derniers épisodes, une section par émission | `pages.js` |
| `videos.html` | Toutes les vidéos YouTube, lecture dans la page | `pages.js` |
| `playlist.html` | Titres diffusés par jour et heure | `playlist.js` |
| `webradios.html` | Les webradios, dans l'ordre | `pages.js` |

`layout.js` construit le header, le menu, le footer et le player sur toutes les pages, et contient la logique de la grille. `styles.css` contient le design ; les couleurs sont en variables en tête de fichier (turquoise #3FCFD5).

## Montrer un autre moment de la semaine : `?now=`

Ajouter `?now=AAAA-MM-JJTHH:MM` à l'adresse force l'heure utilisée par le direct, la grille du jour, la page Émissions et la playlist. L'heure simulée s'affiche dans le bandeau et reste active en naviguant d'une page à l'autre.

- `index.html?now=2026-10-26T07:00` : lundi matin, Le meilleur des réveils
- `index.html?now=2026-10-30T18:15` : vendredi, Les Têtes à Clac
- `index.html?now=2026-10-31T00:30` : nuit de vendredi à samedi, Lac Fever de la veille

## D'où viennent les données

Tout le contenu affiché est dans **`data.js`**, source unique pour le site. Il a été transcrit à la main depuis le dossier `contenus/` (le site ne lit pas les `.txt` : ce serait impossible en ouvrant `index.html` en local).

| Donnée dans `data.js` | Source |
|---|---|
| `week` (grille), `shows` (émissions) | `contenus/grille-antenne.txt` |
| `articles` | `contenus/article-1.txt` … `article-3.txt` |
| `webradios` | `contenus/webradios.txt` (+ Nouveautés en tête) |
| `frequencies` | `contenus/frequences.txt` |
| `apps` | `contenus/liens-app.txt` |
| `playlist` (titres diffusés) | `contenus/titres.json`, récupéré sur radiolac.ch |
| `chronicles` | noms des visuels de `img/podcasts/` |

## Modifier un contenu

Ouvrir `data.js` dans un éditeur de texte, modifier, enregistrer, recharger la page. Penser à reporter le changement dans le `.txt` correspondant de `contenus/` pour garder les deux alignés.

- **Grille** : chaque jour a sa liste `[début, fin, émission]`. Une émission qui passe minuit reste dans le jour où elle commence, avec une fin après 24:00 (Lac Fever : `["22:00", "25:00", "lac-fever"]`, affiché 22:00 – 01:00) ; le jour suivant commence alors à 01:00. Les créneaux doivent se suivre sans trou.
- **Animateurs d'une émission** : `hosts` dans `shows` (ids : `fabien`, `carole`, `fred`, `sophie`). La page Animateurs se met à jour seule.
- **Article** : ajouter une entrée dans `articles` avec un `id` nouveau ; le texte (`body`) est du HTML simple (`<p>`, `<h2>`, `<h3>`, `<ul>`, `<strong>`, `<a>`). Les 3 premiers de la liste s'affichent sur l'accueil. Catégorie `"Concours"` → l'article apparaît aussi dans la page Concours.
- **Podcast** : une chronique se déclare dans `chronicles` (émission, heure de diffusion ; `show: null` pour une chronique sans émission), un épisode dans `episodes` (`ago` : 0 = dernière diffusion, 1 = l'avant-dernière…). La date est calculée d'après la grille et l'heure courante.
- **Vidéos** : rien à faire, elles viennent de la playlist YouTube (voir plus bas).
- **Publicité** : tout est dans `ads` : les formats (`formats`), les largeurs d'écran où l'on passe en tablette puis en ordinateur (`breakpoints`), et pour chaque emplacement les pages, la position (`after` : l'élément après lequel il s'insère) et le format pour mobile, tablette et ordinateur. Chaque emplacement réserve sa hauteur, la page ne bouge pas au chargement de la pub.
- **Webradio** : ajouter une entrée dans `webradios` ; l'ordre de la liste est l'ordre d'affichage, les 4 premières sont visibles sur l'accueil.

## Titres diffusés

La playlist vient de l'API de la page [Derniers titres](https://www.radiolac.ch/derniers-titres/) de radiolac.ch (`api_query.php`). Pour la rafraîchir :

```
python outils/recuperer-titres.py      # 7 derniers jours complets -> contenus/titres.json (environ 5 min)
python outils/preparer-titres.py       # pochettes -> img/titres/ et img-web/titres/, puis bloc playlist de data.js
```

Pour une heure donnée (réelle ou `?now=`), le site affiche ce qui a été diffusé le même jour de la semaine à la même heure dans ces données. Les titres sans pochette, ou avec le visuel générique de la radio, gardent la vignette de couleur.

## Vidéos : mises à jour automatiquement

`videos.js` (chargé par l'accueil et `videos.html`) est réécrit par la GitHub Action **« Vidéos YouTube »** (`.github/workflows/videos.yml`), toutes les 6 heures. Elle lit le flux RSS public de la playlist `PLIHhN1_l6IBU` (YouTube n'y met que les 15 vidéos les plus récentes) et ne commit que si la liste a changé. Si le flux est vide ou inaccessible, `videos.js` n'est pas touché.

Forcer une mise à jour : sur GitHub, onglet **Actions** → **Vidéos YouTube** → **Run workflow**. En local : `python .github/scripts/maj-videos.py`.

La plus récente s'affiche en grand sur l'accueil, les 3 suivantes en liste. La miniature vient de YouTube ; le lecteur (youtube-nocookie.com) n'est chargé qu'au clic.

## Images

- `img/` : les **originaux**, jamais modifiés par le site ni par les outils.
- `img-web/` : les versions légères réellement affichées (WebP, 600 px de large ; 1200 px pour l'actu ; logos recadrés sur le dessin). 81,5 Mo d'originaux → 1,4 Mo.

Pour ajouter ou remplacer une image : déposer l'original dans `img/<dossier>/` avec le nom attendu (le `slug` ou l'`id` de `data.js`, en minuscules, sans accent ni espace), puis régénérer `img-web/` :

```
python outils/optimiser-images.py
```

(Python 3 et Pillow requis : `pip install pillow`.) Le script retire aussi les bandes blanches unies des visuels d'articles. Tant qu'une image manque, une vignette de couleur avec initiales s'affiche à la place.

Un visuel d'article trop éloigné du format 16:9 est affiché en entier sur fond clair plutôt que rogné.

## Publier sur GitHub Pages

1. Créer un dépôt (ex. `radiolac-demo`) et y déposer tout le contenu de ce dossier (y compris `img-web/`).
2. Settings → Pages → Source : *Deploy from a branch* → `main` / `/ (root)`.
3. Le site est en ligne après une minute sur `https://<compte>.github.io/radiolac-demo/`.

Tous les chemins sont relatifs : le site marche quel que soit le nom du dépôt. GitHub Pages respecte la casse des noms de fichiers : garder les noms exactement comme dans `data.js`.

Tout ce qui est dans le dépôt est public, y compris `contenus/`, `img/` (lourd, environ 80 Mo) et les fichiers de travail. Si besoin, ne pas déposer `img/` : le site n'utilise que `img-web/`.

## Ce qui reste des exemples

- **Titres diffusés** (accueil, player, playlist) : vraie playlist d'une semaine, rejouée au même jour de la semaine et à la même heure ; en production, flux de titrage en direct.
- **Épisodes et dates des podcasts** : titres d'épisodes et dates inventés (marqués EXEMPLE dans `data.js`) ; les chroniques et leurs visuels sont réels.
- **Flux audio** : `streamUrl` vide dans `data.js`, le bouton En direct ouvre le player actuel de radiolac.ch. Les webradios ne sont pas jouables dans la démo.
- **Publicité** : cadres de démonstration et habillage factice ; en production, les emplacements sont remplis par la régie.
- **Formulaire de concours** (article 1) : remplacé par une mention, il dépend du site de production.
- **Footer** : « Règlements des concours », « Données personnelles » et le nom du futur site d'info sont affichés sans lien, en attente des adresses.

Tout le reste est réel : grille, émissions, animateurs, articles, webradios, fréquences, liens des apps, visuels.
