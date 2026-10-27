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

  // Réseaux sociaux : header, menu mobile et footer, dans cet ordre.
  // Sans URL, le réseau n'est pas affiché. Pictos : tracés Simple Icons
  // (CC0, simpleicons.org), viewBox 0 0 24 24.
  socials: [
    { name: "Instagram", url: "https://www.instagram.com/radiolac_ch/",
      icon: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" },
    { name: "Facebook", url: "https://www.facebook.com/RadioLacOfficiel",
      icon: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/radio-lac-s-a/",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { name: "TikTok", url: "",
      icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
    { name: "YouTube", url: "",  // URL à venir : https://www.youtube.com/channel/UCvX-duc9zp94V1P1GKtYgaQ
      icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }
  ],

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

  // Chroniques : une par visuel  →  img-web/podcasts/<slug>.webp
  // show : émission parente (null = chronique indépendante, « Le truc en plus »).
  // at : heure de diffusion habituelle. grid : émission pendant laquelle passe
  // une chronique indépendante (sert à placer ses épisodes dans la grille).
  chronicles: [
    { slug: "le-meilleur-des-reveils-le-duel-du-matin", show: "le-meilleur-des-reveils", title: "Le duel du matin", at: "09:30" },
    { slug: "le-meilleur-des-reveils-cette-annee-la", show: "le-meilleur-des-reveils", title: "Cette année-là", at: "08:25" },
    { slug: "le-meilleur-des-reveils-radio-insolite", show: "le-meilleur-des-reveils", title: "Radio insolite", at: "06:38" },
    { slug: "il-suffit-de-demander-le-chiffre-du-jour", show: "il-suffit-de-demander", title: "Le chiffre du jour", at: "10:27" },
    { slug: "il-suffit-de-demander-passion-locale", show: "il-suffit-de-demander", title: "Passion locale", at: "11:40" },
    { slug: "il-suffit-de-demander-les-experts", show: "il-suffit-de-demander", title: "Les experts", at: "12:32" },
    { slug: "jpeux-pas-j-ai-radio-lac-le-mashup-de-zebra", show: "jpeux-pas-j-ai-radio-lac", title: "Le mashup de Zebra", at: "16:45" },
    { slug: "jpeux-pas-j-ai-radio-lac-eric-achkar-ramene-sa-science", show: "jpeux-pas-j-ai-radio-lac", title: "Eric Achkar ramène sa science", at: "17:20" },
    { slug: "jpeux-pas-j-ai-radio-lac-what-a-good-heidi", show: "jpeux-pas-j-ai-radio-lac", title: "What a good Heidi", at: "19:10" },
    { slug: "le-truc-en-plus", show: null, grid: "il-suffit-de-demander", title: "Le truc en plus", at: "11:00" }
  ],

  // Épisodes : EXEMPLES, à brancher sur le pipeline de publication.
  // ago : rang de diffusion, 0 = dernière diffusion de l'émission avant
  // maintenant, 1 = la précédente, etc. La date est calculée à l'affichage
  // d'après la grille et l'heure courante (ou ?now=) : le bloc reste à jour
  // et un épisode ne tombe jamais un jour où l'émission n'est pas à l'antenne.
  // title : vrai titre relevé sur radiolac.ch (27.10.2026) ; absent = titre
  // neutre daté, ex. « Le duel du matin, 24 octobre ».
  episodes: [
    { c: "le-meilleur-des-reveils-le-duel-du-matin", ago: 0, title: "Tout savoir sur le champagne" },
    { c: "le-meilleur-des-reveils-le-duel-du-matin", ago: 3 },
    { c: "le-meilleur-des-reveils-le-duel-du-matin", ago: 6 },
    { c: "le-meilleur-des-reveils-cette-annee-la", ago: 1 },
    { c: "le-meilleur-des-reveils-cette-annee-la", ago: 4 },
    { c: "le-meilleur-des-reveils-cette-annee-la", ago: 7 },
    { c: "le-meilleur-des-reveils-radio-insolite", ago: 0, title: "La mésaventure de Miss Neuchâtel à la Fête des Vendanges" },
    { c: "le-meilleur-des-reveils-radio-insolite", ago: 2 },
    { c: "le-meilleur-des-reveils-radio-insolite", ago: 5 },
    { c: "le-meilleur-des-reveils-radio-insolite", ago: 8 },
    { c: "il-suffit-de-demander-le-chiffre-du-jour", ago: 0, title: "Royaume-Uni : 500 000 arbres plantés pour le climat !" },
    { c: "il-suffit-de-demander-le-chiffre-du-jour", ago: 2 },
    { c: "il-suffit-de-demander-le-chiffre-du-jour", ago: 5 },
    { c: "il-suffit-de-demander-le-chiffre-du-jour", ago: 8 },
    { c: "il-suffit-de-demander-passion-locale", ago: 1 },
    { c: "il-suffit-de-demander-passion-locale", ago: 4 },
    { c: "il-suffit-de-demander-passion-locale", ago: 7 },
    { c: "il-suffit-de-demander-les-experts", ago: 0, title: "Nutrition sportive et fatigue : comment mieux se nourrir ?" },
    { c: "il-suffit-de-demander-les-experts", ago: 3, title: "La fiabilité, clé du management en entreprise" },
    { c: "il-suffit-de-demander-les-experts", ago: 6 },
    { c: "jpeux-pas-j-ai-radio-lac-le-mashup-de-zebra", ago: 0, title: "Le mélange inédit de AC/DC, Queen et Dr. Dre" },
    { c: "jpeux-pas-j-ai-radio-lac-le-mashup-de-zebra", ago: 3 },
    { c: "jpeux-pas-j-ai-radio-lac-le-mashup-de-zebra", ago: 6 },
    { c: "jpeux-pas-j-ai-radio-lac-eric-achkar-ramene-sa-science", ago: 2 },
    { c: "jpeux-pas-j-ai-radio-lac-eric-achkar-ramene-sa-science", ago: 4, title: "Éclipses solaires et lunaires : comment les différencier ?" },
    { c: "jpeux-pas-j-ai-radio-lac-eric-achkar-ramene-sa-science", ago: 8 },
    { c: "jpeux-pas-j-ai-radio-lac-what-a-good-heidi", ago: 1 },
    { c: "jpeux-pas-j-ai-radio-lac-what-a-good-heidi", ago: 4 },
    { c: "jpeux-pas-j-ai-radio-lac-what-a-good-heidi", ago: 7 },
    { c: "le-truc-en-plus", ago: 0 },
    { c: "le-truc-en-plus", ago: 2 },
    { c: "le-truc-en-plus", ago: 4 },
    { c: "le-truc-en-plus", ago: 7 }
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
