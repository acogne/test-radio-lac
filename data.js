/* ==========================================================
   Radio Lac — démo : tout le contenu éditable est ici.
   Sources : dossier contenus/ (transcrit à la main, les .txt ne
   sont pas lus par le site) et noms de fichiers de img/.
   Les valeurs marquées EXEMPLE ne sont pas réelles.

   IMAGES : le site affiche les versions optimisées de img-web/
   (<dossier>/<slug>.webp). Si un fichier manque, une vignette de
   couleur avec initiales s'affiche à la place.
   ========================================================== */

window.RL = {
  // Flux audio direct. Laisser vide : le bouton ouvre le player actuel.
  streamUrl: "",
  playerUrl: "https://www.radiolac.ch/direct/player/",
  // Futur site d'information (nom à définir ; pas encore de lien)
  infoSiteName: "le nouveau site d'info régionale",

  // Applications (contenus/liens-app.txt)
  apps: {
    ios: "https://apps.apple.com/ch/app/radio-lac/id1384425994?l=fr-FR",
    android: "https://play.google.com/store/apps/details?id=ch.mediaone.radiolac&hl=fr_CH"
  },

  // Fréquences (contenus/frequences.txt)
  frequencies: {
    intro: "Radio Lac émet sur toute la Suisse romande en DAB+ et en FM dans les villes suivantes :",
    fm: [
      { zone: "Genève", freq: "91.8" },
      { zone: "Nyon", freq: "93.3" },
      { zone: "Gland, Morges, Lausanne", freq: "95.6" },
      { zone: "La Riviera vaudoise : Vevey, Montreux, Villeneuve", freq: "95.2" },
      { zone: "Nord vaudois, Vallorbe", freq: "93.3, 92.3 et 94" },
      { zone: "Moudon, Payerne", freq: "94.9" }
    ]
  },

  // Les 4 voix de Radio Lac  →  img-web/animateurs/<id>.webp
  hosts: [
    { id: "fabien", name: "Fabien" },
    { id: "carole", name: "Carole" },
    { id: "fred", name: "Fred" },
    { id: "sophie", name: "Sophie" }
  ],

  // Émissions  →  img-web/emissions/<id>.webp
  shows: {
    "le-meilleur-de-la-musique": { name: "Le meilleur de la musique", hosts: [] },
    "le-meilleur-des-reveils": { name: "Le meilleur des réveils", hosts: ["fabien", "carole"] },
    "il-suffit-de-demander": { name: "Il suffit de demander", hosts: ["fred"] },
    "jpeux-pas-j-ai-radio-lac": { name: "J'peux pas j'ai Radio Lac", hosts: ["sophie"] },
    "les-tetes-a-clac": { name: "Les Têtes à Clac", hosts: ["sophie"] },
    "studio-vinyles": { name: "Studio Vinyles", hosts: [] },
    "pepites-80": { name: "Pépites 80", hosts: [] },
    "lac-fever": { name: "Lac Fever", hosts: [] },
    "radio-lac-week-end": { name: "Radio Lac week-end", hosts: [] }
  },

  // Grille de la semaine (contenus/grille-antenne.txt), lundi → dimanche.
  // [début, fin, émission]. Une émission qui passe minuit reste dans la
  // grille du jour où elle commence : Lac Fever 22:00 → 25:00 (= 01:00).
  // Le jour suivant commence alors à 01:00.
  week: [
    { day: "Lundi", slots: [
      ["00:00", "06:00", "le-meilleur-de-la-musique"],
      ["06:00", "10:00", "le-meilleur-des-reveils"],
      ["10:00", "13:00", "il-suffit-de-demander"],
      ["13:00", "16:00", "le-meilleur-de-la-musique"],
      ["16:00", "20:00", "jpeux-pas-j-ai-radio-lac"],
      ["20:00", "22:00", "studio-vinyles"],
      ["22:00", "23:00", "pepites-80"],
      ["23:00", "24:00", "le-meilleur-de-la-musique"]
    ] },
    { day: "Mardi", slots: [
      ["00:00", "06:00", "le-meilleur-de-la-musique"],
      ["06:00", "10:00", "le-meilleur-des-reveils"],
      ["10:00", "13:00", "il-suffit-de-demander"],
      ["13:00", "16:00", "le-meilleur-de-la-musique"],
      ["16:00", "20:00", "jpeux-pas-j-ai-radio-lac"],
      ["20:00", "22:00", "studio-vinyles"],
      ["22:00", "23:00", "pepites-80"],
      ["23:00", "24:00", "le-meilleur-de-la-musique"]
    ] },
    { day: "Mercredi", slots: [
      ["00:00", "06:00", "le-meilleur-de-la-musique"],
      ["06:00", "10:00", "le-meilleur-des-reveils"],
      ["10:00", "13:00", "il-suffit-de-demander"],
      ["13:00", "16:00", "le-meilleur-de-la-musique"],
      ["16:00", "20:00", "jpeux-pas-j-ai-radio-lac"],
      ["20:00", "22:00", "studio-vinyles"],
      ["22:00", "23:00", "pepites-80"],
      ["23:00", "24:00", "le-meilleur-de-la-musique"]
    ] },
    { day: "Jeudi", slots: [
      ["00:00", "06:00", "le-meilleur-de-la-musique"],
      ["06:00", "10:00", "le-meilleur-des-reveils"],
      ["10:00", "13:00", "il-suffit-de-demander"],
      ["13:00", "16:00", "le-meilleur-de-la-musique"],
      ["16:00", "20:00", "jpeux-pas-j-ai-radio-lac"],
      ["20:00", "22:00", "studio-vinyles"],
      ["22:00", "25:00", "lac-fever"]
    ] },
    { day: "Vendredi", slots: [
      ["01:00", "06:00", "le-meilleur-de-la-musique"],
      ["06:00", "10:00", "le-meilleur-des-reveils"],
      ["10:00", "13:00", "il-suffit-de-demander"],
      ["13:00", "16:00", "le-meilleur-de-la-musique"],
      ["16:00", "18:00", "jpeux-pas-j-ai-radio-lac"],
      ["18:00", "18:30", "les-tetes-a-clac"],
      ["18:30", "20:00", "jpeux-pas-j-ai-radio-lac"],
      ["20:00", "22:00", "studio-vinyles"],
      ["22:00", "25:00", "lac-fever"]
    ] },
    { day: "Samedi", slots: [
      ["01:00", "06:00", "le-meilleur-de-la-musique"],
      ["06:00", "20:00", "radio-lac-week-end"],
      ["20:00", "22:00", "studio-vinyles"],
      ["22:00", "25:00", "lac-fever"]
    ] },
    { day: "Dimanche", slots: [
      ["01:00", "06:00", "le-meilleur-de-la-musique"],
      ["06:00", "20:00", "radio-lac-week-end"],
      ["20:00", "22:00", "studio-vinyles"],
      ["22:00", "24:00", "le-meilleur-de-la-musique"]
    ] }
  ],

  // Rotation de titres (EXEMPLE — à brancher sur le flux de titrage existant)
  songs: [
    { artist: "Calogero", title: "Face à la mer" },
    { artist: "Dua Lipa", title: "Levitating" },
    { artist: "Indochine", title: "J'ai demandé à la lune" },
    { artist: "Harry Styles", title: "As It Was" },
    { artist: "Céline Dion", title: "Pour que tu m'aimes encore" },
    { artist: "Coldplay", title: "Viva la Vida" },
    { artist: "Vianney", title: "Je m'en vais" },
    { artist: "The Weeknd", title: "Blinding Lights" },
    { artist: "Mylène Farmer", title: "Désenchantée" },
    { artist: "Ed Sheeran", title: "Shape of You" },
    { artist: "Stephan Eicher", title: "Déjeuner en paix" },
    { artist: "Adele", title: "Rolling in the Deep" },
    { artist: "Zaz", title: "Je veux" },
    { artist: "Bruno Mars", title: "Uptown Funk" },
    { artist: "Jean-Jacques Goldman", title: "Quand la musique est bonne" },
    { artist: "Miley Cyrus", title: "Flowers" },
    { artist: "Téléphone", title: "Un autre monde" },
    { artist: "Pharrell Williams", title: "Happy" }
  ],

  // Podcasts : une chronique par visuel  →  img-web/podcasts/<slug>.webp
  // show : id de l'émission parente (null = chronique indépendante).
  // ep et date : EXEMPLES, à brancher sur le pipeline de publication.
  // Liste triée du plus récent au plus ancien.
  podcasts: [
    { slug: "le-meilleur-des-reveils-le-duel-du-matin", show: "le-meilleur-des-reveils", title: "Le duel du matin", ep: "Épisode du lundi 26 octobre", date: "26 oct. 2026" },
    { slug: "il-suffit-de-demander-le-chiffre-du-jour", show: "il-suffit-de-demander", title: "Le chiffre du jour", ep: "Épisode du lundi 26 octobre", date: "26 oct. 2026" },
    { slug: "le-truc-en-plus", show: null, title: "Le truc en plus", ep: "Épisode du samedi 24 octobre", date: "24 oct. 2026" },
    { slug: "jpeux-pas-j-ai-radio-lac-eric-achkar-ramene-sa-science", show: "jpeux-pas-j-ai-radio-lac", title: "Eric Achkar ramène sa science", ep: "Éclipses solaires et lunaires : comment les différencier ?", date: "23 oct. 2026" },
    { slug: "le-meilleur-des-reveils-cette-annee-la", show: "le-meilleur-des-reveils", title: "Cette année-là", ep: "Épisode du vendredi 23 octobre", date: "23 oct. 2026" },
    { slug: "il-suffit-de-demander-les-experts", show: "il-suffit-de-demander", title: "Les experts", ep: "La fiabilité, clé du management en entreprise", date: "22 oct. 2026" },
    { slug: "jpeux-pas-j-ai-radio-lac-le-mashup-de-zebra", show: "jpeux-pas-j-ai-radio-lac", title: "Le mashup de Zebra", ep: "Épisode du jeudi 22 octobre", date: "22 oct. 2026" },
    { slug: "le-meilleur-des-reveils-radio-insolite", show: "le-meilleur-des-reveils", title: "Radio insolite", ep: "Épisode du mercredi 21 octobre", date: "21 oct. 2026" },
    { slug: "jpeux-pas-j-ai-radio-lac-what-a-good-heidi", show: "jpeux-pas-j-ai-radio-lac", title: "What a good Heidi", ep: "Épisode du mercredi 21 octobre", date: "21 oct. 2026" },
    { slug: "il-suffit-de-demander-passion-locale", show: "il-suffit-de-demander", title: "Passion locale", ep: "Épisode du mardi 20 octobre", date: "20 oct. 2026" }
  ],

  // Articles (contenus/article-N.txt)  →  img-web/actu/article-N.webp
  // Le texte reprend celui du site actuel, nettoyé du balisage WordPress.
  articles: [
    {
      id: 1, slug: "article-1", tag: "Concours", date: "26 octobre 2026",
      title: "Gagnez vos billets pour Servette – OH Louvain !",
      body: `
<p class="lead">Une soirée de football européen vous attend à Genève ! Le mercredi 28 octobre à 18h45, le Servette FC Chênois Féminin accueille OH Louvain au Stade de Genève pour la troisième journée de la Ligue des champions féminine. Et Radio Lac vous offre la possibilité d'assister à cette rencontre !</p>
<p>Les Servettiennes ont déjà prouvé qu'elles avaient du répondant sur la scène européenne. Après avoir éliminé le Sparta Prague grâce à une victoire 3-0 au match retour, les Grenat ont décroché leur place dans la phase de ligue. En championnat, elles ont également signé de belles victoires, notamment un succès 4-1 face à Lucerne.</p>
<p>Face à OH Louvain, les Genevoises auront à cœur de rebondir et de décrocher leurs premiers points dans cette phase de ligue. Un défi de taille, mais aussi une belle occasion de compter sur le soutien du public pour faire la différence !</p>
<p>Envie de vivre cette affiche européenne en direct ? Participez à notre concours et tentez de remporter vos billets pour encourager les Servettiennes au Stade de Genève.</p>
<h2>Ce que vous pouvez gagner</h2>
<ul>
  <li><strong>2 places</strong> match SFC Chênois Féminin vs OH Louvain</li>
  <li><strong>Date :</strong> mercredi 28 octobre</li>
  <li><strong>Heure :</strong> 18h45</li>
  <li><strong>Lieu :</strong> Stade de Genève</li>
</ul>
<h2>Comment participer ?</h2>
<p>Vous pouvez tenter votre chance de deux façons :</p>
<ul>
  <li>Écoutez Radio Lac tout au long de la journée pour participer à l'antenne.</li>
  <li>Remplissez le formulaire disponible en bas de cette page.</li>
</ul>
<p class="form-placeholder">Formulaire de participation : affiché sur le site de production, non reproduit dans la démo.</p>`
    },
    {
      id: 2, slug: "article-2", tag: "Sorties", date: "26 octobre 2026",
      title: "Les Automnales 2026 à Genève : dix jours de découvertes festives à Palexpo",
      body: `
<p class="lead">Du 6 au 15 novembre 2026, les Automnales font leur retour à Palexpo avec dix jours de découvertes, de rencontres et d'animations. Au programme : treize grands rendez-vous, trois nouveautés, une braderie prolongée et des soirées festives jusqu'à minuit. Une édition qui fait la part belle aux talents et au savoir-faire de la région.</p>
<h2>Les Automnales 2026 mettent Genève et ses talents à l'honneur</h2>
<p>Chaque année, les Automnales donnent rendez-vous au public genevois pour découvrir, goûter, échanger et partager de bons moments.</p>
<p>Artisans, créateurs, entreprises, artistes et exposants locaux seront au cœur de cette nouvelle édition. L'occasion de découvrir des savoir-faire, de rencontrer des professionnels passionnés et de faire quelques trouvailles, tout en profitant d'une atmosphère conviviale.</p>
<p>Pour permettre à chacun de composer sa visite selon ses envies, les Automnales conserveront leurs trois grands espaces : <strong>Automnales Market, Automnales Food Festival et Automnales Emotion</strong>. Trois univers complémentaires qui réuniront treize grands rendez-vous autour de thématiques variées.</p>
<p>Que vous veniez pour faire du shopping, découvrir de nouvelles saveurs, assister à des animations ou simplement passer un moment entre amis ou en famille, les possibilités ne manqueront pas.</p>
<h2>Trois nouveautés à découvrir pour cette édition 2026</h2>
<p>Cette année, les Automnales enrichissent leur programmation avec trois nouveaux rendez-vous qui s'adressent à des publics très différents.</p>
<h3>DEKA Fit, un défi pour les amateurs de sport (7-8 novembre)</h3>
<p>Avis aux passionnés d'activité physique ! Avec DEKA Fit, les Automnales accueillent un défi sportif qui combine endurance et fitness. Une nouveauté qui apportera une dimension sportive à la manifestation.</p>
<h3>Au Cœur du Fret, dans les coulisses du transport de marchandises (7-8 novembre)</h3>
<p>Comment les marchandises circulent-elles et quelles activités se cachent derrière leur acheminement ? Le nouvel espace Au Cœur du Fret proposera de découvrir les coulisses de ce secteur essentiel à notre quotidien, mais souvent méconnu du grand public.</p>
<h3>FUTUR'UP, pour aider les jeunes à préparer leur avenir (14-15 novembre)</h3>
<p>Choisir ses études supérieures représente une étape importante. Avec FUTUR'UP, les Automnales proposeront un nouveau rendez-vous destiné à accompagner les jeunes dans leur réflexion et leur orientation. Une occasion d'explorer les possibilités qui s'offrent à eux pour la suite de leur parcours.</p>
<h2>Le 12 novembre : une soirée Lac Fever</h2>
<p>Les Automnales ne se limitent pas aux stands et aux découvertes. La musique et la convivialité occuperont également une place importante dans cette édition 2026.</p>
<p>La scène de l'<strong>Automnales Food Festival</strong> accueillera une programmation en continu, avec des concerts, des DJ sets et un concours de chant. De quoi accompagner les moments gourmands et prolonger les rencontres dans une ambiance festive.</p>
<p>L'une des grandes nouveautés de cette année concernera les horaires. <strong>Le jeudi 12 novembre, une nocturne inédite permettra de profiter simultanément des trois espaces jusqu'à 22h</strong>. Le DJ résident de Radio Lac, <strong>Arnaud Godefroy</strong>, prendra les platines pour un <strong>Lac Fever</strong> spécial !</p>
<p>En parallèle, quatre humoristes romands se produiront dans le cadre d'un Comedy Club qui promet de faire résonner les rires dans toute la halle !</p>
<p>Et pour celles et ceux qui souhaitent prolonger la fête, l'Automnales Food Festival restera ouvert <strong>jusqu'à minuit les vendredis et samedis soir</strong>. Des DJ sets du Village du Soir et de Genève Fabuleuse viendront rythmer ces soirées.</p>
<h2>Une braderie pendant les dix jours des Automnales</h2>
<p>Autre nouveauté à retenir : la braderie s'étendra à toute la durée de la manifestation.</p>
<p>Du 6 au 15 novembre, les visiteurs pourront ainsi profiter de ce rendez-vous shopping pendant les dix jours des Automnales.</p>
<p>Cette formule permettra également de prendre davantage de temps pour parcourir les stands, découvrir les exposants et partir à la recherche de bonnes affaires.</p>
<h2>Swissint, invité d'honneur des Automnales 2026</h2>
<p>Pour cette édition, les Automnales accueilleront <strong>Swissint, le centre de compétence de l'Armée suisse pour la promotion de la paix</strong>, en qualité d'invité d'honneur.</p>
<p>Sa présence permettra de mettre en lumière une mission particulière de l'Armée suisse, celle de la promotion de la paix. Un sujet qui viendra compléter la diversité des univers représentés au sein de la manifestation.</p>
<p>Avec ses treize grands rendez-vous, ses nouveautés et ses nombreuses animations, les Automnales 2026 entendent une nouvelle fois rassembler les générations et les centres d'intérêt.</p>
<p><strong>Rendez-vous du 6 au 15 novembre 2026 à Palexpo, à Genève, pour profiter de cette nouvelle édition des Automnales.</strong></p>`
    },
    {
      id: 3, slug: "article-3", tag: "Émissions", date: "2 octobre 2026",
      title: "Du 3 au 11 octobre 2026, Genève met la démocratie à l'honneur !",
      body: `
<p class="lead">Neuf jours pendant lesquels habitantes et habitants, élèves, associations, institutions et simples curieux sont invités à se croiser, à discuter, à imaginer ensemble ce que sera la participation citoyenne de demain. Ateliers, débats, visites, expositions, expériences immersives : plus de 50 rendez-vous sont ouverts dans tout le canton, pour le grand public comme pour les écoles.</p>
<h2>Près de cinquante partenaires</h2>
<p>Tous issus des milieux publics, académiques et associatifs, portent cette Semaine de la démocratie. L'idée : la faire vivre au plus près de celles et ceux qui la pratiquent chaque jour. L'occasion de poser des questions, de confronter des idées, de chercher ensemble des réponses aux défis de notre époque. Parce que la démocratie ne s'arrête pas aux urnes. Elle se nourrit de dialogue, d'écoute, d'engagement.</p>
<h2>L'édition 2026 braque le projecteur sur l'intelligence artificielle</h2>
<p>L'innovation locale et la place des jeunes générations. Avec « Votation 2032 — La Campagne Synthétique » ou le hackathon « Fake it until you make it ! », le public pourra mesurer comment les outils numériques, les deepfakes et la désinformation pèsent déjà sur le débat démocratique. D'autres formats, comme la simulation d'assemblée citoyenne ou l'Urbansgemeinde, permettent d'expérimenter concrètement la discussion collective et la prise de décision.</p>
<h2>Parmi les temps forts</h2>
<p>« Un Jour au Cœur de la République » ouvre les portes des trois pouvoirs genevois : on y participe à des séances fictives du Grand Conseil, du Conseil d'État ou du Pouvoir judiciaire. Ouverte, plurielle, accessible, cette semaine vient rappeler une évidence : la démocratie reste vivante tant qu'on la pratique, qu'on la questionne et qu'on la construit ensemble.</p>
<p><strong>Le programme complet :</strong> <a href="https://www.ge.ch/teaser/semaine-democratie-2026" target="_blank" rel="noopener">ici</a></p>
<h3>Mercredi 30 septembre 2026 : Carole et Fabien vous présentent la Semaine de la démocratie</h3>
<p>En présence de Dilara Bayrak, Présidente du Grand Conseil, et Patrick Becker, Secrétaire général du Pouvoir judiciaire, et les différents rendez-vous à découvrir dans le canton.</p>
<p><a href="https://www.radiolac.ch/podcasts/le-meilleur-des-reveils-30-09-2026-0837-084906/" target="_blank" rel="noopener"><em>Carole et Fabien vous parlent de la Semaine de la démocratie dans Le meilleur des réveils.</em></a></p>
<h3>Vendredi 2 octobre 2026 : du 3 au 11 octobre, Genève</h3>
<p><em>Fred vous parle de la Semaine de la démocratie qui commence demain.</em></p>
<audio controls preload="none" src="https://play.vod2.infomaniak.com/single/1jijk03uoqz0h/1jhvl2uqemvp2/1jijk03uoqz0r.mp3"></audio>
<h3>Samedi 3 octobre 2026 : découvrez l'émission spéciale consacrée à la Semaine de la démocratie</h3>
<p><em>Fred revient sur les enjeux et les temps forts de cette édition 2026.</em></p>
<audio controls preload="none" src="https://play.vod2.infomaniak.com/single/1jijk03uo2yqq/1jhvl2uqjyf5g/1jijk03uo2yqv.mp3"></audio>
<h3>Lundi 5 octobre 2026 : Fred vous emmène à la découverte de la Semaine de la démocratie dans « Il suffit de demander »</h3>
<p><em>Trois rendez-vous pour en savoir plus sur cette semaine qui invite les Genevoises et les Genevois à participer, échanger et réfléchir ensemble.</em></p>
<audio controls preload="none" src="https://play.vod2.infomaniak.com/single/1jijk03uo4bo4/1jhvl2uqjyf5g/1jijk03uo4bo9.mp3"></audio>
<h3>Mardi 6 octobre : tables rondes à Genève</h3>
<p><em>Fred vous emmène au cœur des tables rondes organisées à Genève dans le cadre de la Semaine de la démocratie.</em></p>
<audio controls preload="none" src="https://play.vod2.infomaniak.com/single/1jijk03uo8x9c/1jhvl2uqjyf5g/1jijk03uo8x9h.mp3"></audio>
<h3>Mercredi 7 octobre : découvrez le logiciel Decidim à Genève !</h3>
<p><em>À l'occasion de la Semaine de la démocratie, Genève met à l'honneur Decidim. Ce logiciel libre favorise la participation citoyenne en facilitant l'implication locale.</em></p>
<audio controls preload="none" src="https://play.vod2.infomaniak.com/single/1jijk03uodph1/1jhvl2uqjyf5g/1jijk03uodpsf.mp3"></audio>
<h3>Jeudi 8 octobre : des ateliers dédiés aux jeunes</h3>
<p><em>La Semaine de la démocratie propose des ateliers sur l'engagement des jeunes et une conférence sur la désinformation. Ces rencontres se tiendront à Genève pour explorer les enjeux démocratiques actuels.</em></p>
<audio controls preload="none" src="https://play.vod2.infomaniak.com/single/1jijk03uoh0c2/1jhvl2uqjyf5g/1jijk03uoh0c9.mp3"></audio>
<h3>Vendredi 9 octobre : Genève célèbre la démocratie jusqu'au 11 octobre !</h3>
<p><em>Jusqu'au 11 octobre, Genève célèbre la démocratie avec des séances fictives des institutions et une assemblée citoyenne à Meyrin. Le public est invité à découvrir ces événements ouverts à tous.</em></p>
<audio controls preload="none" src="https://play.vod2.infomaniak.com/single/1jijk03uok6jr/1jhvl2uqjyf5g/1jijk03uok6jy.mp3"></audio>
<h3>Samedi 10 octobre : deux rendez-vous au programme</h3>
<p><em>Comment la créativité peut-elle nous aider à imaginer le Genève de demain ? Découvrez Genève Prospective, une initiative qui invite à visualiser les futurs possibles du canton. Rendez-vous à Uni Mail, de 18h15 à 20h15, pour un débat consacré à l'avenir de la démocratie genevoise, à ses défis et aux innovations qui pourraient la faire évoluer.</em></p>
<audio controls preload="none" src="https://play.vod2.infomaniak.com/single/1jijk03uoqvzq/1jhvl2uqjyf5g/1jijk03uoqvzv.mp3"></audio>`
    }
  ],

  // Webradios (contenus/webradios.txt, dans l'ordre ; Nouveautés en tête)
  // Les 4 premières sont celles visibles sur l'accueil.  →  img-web/webradios/<slug>.webp
  webradios: [
    { slug: "nouveautes", name: "Nouveautés" },
    { slug: "best-of-70-s", name: "Best of 70's" },
    { slug: "merry-christmas", name: "Merry Christmas" },
    { slug: "au-cinoche", name: "Au Cinoche" },
    { slug: "italia", name: "Italia" },
    { slug: "100-rock", name: "100% Rock" },
    { slug: "2010-2020", name: "2010-2020" },
    { slug: "100-reggae", name: "100% Reggae" },
    { slug: "best-of-80-s", name: "Best of 80's" },
    { slug: "best-of-90-s", name: "Best of 90's" },
    { slug: "best-of-2000", name: "Best of 2000" },
    { slug: "pepites-80", name: "Pépites 80" },
    { slug: "chansons-francaises", name: "Chanson française" },
    { slug: "electro", name: "Electro" },
    { slug: "latina", name: "Latino" },
    { slug: "love-song", name: "Love Song" },
    { slug: "rap-anglophone", name: "Rap anglophone" },
    { slug: "rap-francophone", name: "Rap francophone" },
    { slug: "zen", name: "Zen" },
    { slug: "rock-collector", name: "Rock Collector" }
  ]
};
