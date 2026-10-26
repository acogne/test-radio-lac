# Radio Lac — démo du futur site

Démo statique (HTML/CSS/JS, sans dépendance ni étape de build) du site Radio Lac recentré sur l'antenne : musique, divertissement, émissions. L'information régionale part sur un autre site, signalé en pied de page.

Le site fonctionne sur GitHub Pages **et** en local, en double-cliquant sur `index.html`.

Bouton **« Voir l'effort de production par bloc »** (bandeau du haut) : montre pour chaque bloc s'il se remplit seul ou demande un peu de travail. Lien direct : `index.html#annotations`.

## Pages

| Page | Contenu | Script |
|---|---|---|
| `index.html` | Accueil : direct, grille du jour, titres, actu, podcasts, webradios, apps | `app.js` |
| `emissions.html` | Grille de la semaine, un onglet par jour (jour courant par défaut) | `pages.js` |
| `animateurs.html` | Les 4 animateurs, leurs émissions et horaires (déduits de la grille) | `pages.js` |
| `frequences.html` | DAB+, fréquences FM, liens des apps | `pages.js` |
| `actu.html` | Tous les articles | `pages.js` |
| `article.html?id=N` | Un article (N = 1, 2, 3…) ; id inconnu → message et lien vers l'actu | `pages.js` |
| `concours.html` | Les articles de catégorie « Concours » (état vide prévu s'il n'y en a aucun) | `pages.js` |
| `podcasts.html` | Toutes les chroniques, regroupées par émission | `pages.js` |
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
| `podcasts` | noms des visuels de `img/podcasts/` |

## Modifier un contenu

Ouvrir `data.js` dans un éditeur de texte, modifier, enregistrer, recharger la page. Penser à reporter le changement dans le `.txt` correspondant de `contenus/` pour garder les deux alignés.

- **Grille** : chaque jour a sa liste `[début, fin, émission]`. Une émission qui passe minuit reste dans le jour où elle commence, avec une fin après 24:00 (Lac Fever : `["22:00", "25:00", "lac-fever"]`, affiché 22:00 – 01:00) ; le jour suivant commence alors à 01:00. Les créneaux doivent se suivre sans trou.
- **Animateurs d'une émission** : `hosts` dans `shows` (ids : `fabien`, `carole`, `fred`, `sophie`). La page Animateurs se met à jour seule.
- **Article** : ajouter une entrée dans `articles` avec un `id` nouveau ; le texte (`body`) est du HTML simple (`<p>`, `<h2>`, `<h3>`, `<ul>`, `<strong>`, `<a>`). Les 3 premiers de la liste s'affichent sur l'accueil. Catégorie `"Concours"` → l'article apparaît aussi dans la page Concours.
- **Podcast** : ajouter une entrée dans `podcasts` (liste du plus récent au plus ancien). `show: null` pour une chronique sans émission.
- **Webradio** : ajouter une entrée dans `webradios` ; l'ordre de la liste est l'ordre d'affichage, les 4 premières sont visibles sur l'accueil.

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

- **Titres diffusés** (accueil, player, playlist) : simulation à partir d'une liste fixe de titres ; en production, flux de titrage existant.
- **Épisodes et dates des podcasts** : titres d'épisodes et dates inventés (marqués EXEMPLE dans `data.js`) ; les chroniques et leurs visuels sont réels.
- **Flux audio** : `streamUrl` vide dans `data.js`, le bouton En direct ouvre le player actuel de radiolac.ch. Les webradios ne sont pas jouables dans la démo.
- **Formulaire de concours** (article 1) : remplacé par une mention, il dépend du site de production.
- **Footer** : « Règlements des concours », « Données personnelles » et le nom du futur site d'info sont affichés sans lien, en attente des adresses.

Tout le reste est réel : grille, émissions, animateurs, articles, webradios, fréquences, liens des apps, visuels.
